<?php
/* Template Name: Testing
 * Template author: Stature
 *
 */
// get_header();


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

if (!isset($_FILES['file'])) {
    echo json_encode(['error' => 'No file provided']);
    exit;
}

// ==== CONFIG ====
$accessKey = 'DO80193D4WJJWV9DJKLW';
$secretKey = 'keYr9Ah1QWE03qkvUVFjXSPj3d0k5ii0uhWyJv4dwXI';
$region = 'nyc3';
$service = 's3';
$bucket = 'mydt-static-assets';
$endpoint = 'nyc3.digitaloceanspaces.com';
$acl = 'public-read';

$file = $_FILES['file'];
$fileName = time() . '-' . basename($file['name']);
$key = "cometchat/$fileName";
$host = "$bucket.$endpoint";
$url = "https://$host/$key";

$contentType = $file['type'];
$payload = file_get_contents($file['tmp_name']);
$payloadHash = hash('sha256', $payload);

// ==== DATE ====
$now = new DateTime('UTC');
$amzDate = $now->format('Ymd\THis\Z');  // 20250725T095500Z
$dateStamp = $now->format('Ymd');       // 20250725

// ==== Canonical Request ====
$canonicalURI = '/' . $key;
$canonicalQueryString = '';
$canonicalHeaders = 
    "content-type:$contentType\n" .
    "host:$host\n" .
    "x-amz-acl:$acl\n" .
    "x-amz-content-sha256:$payloadHash\n" .
    "x-amz-date:$amzDate\n";

$signedHeaders = "content-type;host;x-amz-acl;x-amz-content-sha256;x-amz-date";

$canonicalRequest = implode("\n", [
    'PUT',
    $canonicalURI,
    $canonicalQueryString,
    $canonicalHeaders,
    $signedHeaders,
    $payloadHash
]);

// ==== String to Sign ====
$algorithm = 'AWS4-HMAC-SHA256';
$credentialScope = "$dateStamp/$region/$service/aws4_request";
$stringToSign = implode("\n", [
    $algorithm,
    $amzDate,
    $credentialScope,
    hash('sha256', $canonicalRequest)
]);

// ==== Signing Key ====
function hmac($key, $data) {
    return hash_hmac('sha256', $data, $key, true);
}
$kSecret = 'AWS4' . $secretKey;
$kDate = hmac($kSecret, $dateStamp);
$kRegion = hmac($kDate, $region);
$kService = hmac($kRegion, $service);
$kSigning = hmac($kService, 'aws4_request');

$signature = hash_hmac('sha256', $stringToSign, $kSigning);

// ==== Authorization Header ====
$authorizationHeader = "$algorithm Credential=$accessKey/$credentialScope, SignedHeaders=$signedHeaders, Signature=$signature";

// ==== CURL Upload ====
$headers = [
    "Authorization: $authorizationHeader",
    "x-amz-date: $amzDate",
    "x-amz-content-sha256: $payloadHash",
    "x-amz-acl: $acl",
    "Content-Type: $contentType",
    "Content-Length: " . strlen($payload),
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    echo json_encode(['url' => $url]);
} else {
    echo json_encode([
        'error' => 'Upload failed',
        'httpCode' => $httpCode,
        'response' => $response
    ]);
}