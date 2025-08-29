import { Text, TextStyle } from "react-native";
import React from "react";
import { CometChatTextFormatter } from "@cometchat/chat-uikit-react-native";

class CometChatHTMLFormatter extends CometChatTextFormatter {
    override getFormattedText(inputText: string | null): string | JSX.Element {
        if (!inputText || typeof inputText !== "string") return inputText || "";

        const tagRegex = /<\/?(b|i|u|s|strike|ul|ol|li)>|([^<]+)/g;
        const result: JSX.Element[] = [];

        const styleStack: TextStyle[] = [];
        let currentStyle: TextStyle = {};
        let listType: 'ul' | 'ol' | null = null;
        let listIndex = 1;
        let inListItem = false;
        let index = 0;

        let match;
        while ((match = tagRegex.exec(inputText)) !== null) {
            const [fullMatch, tag, text] = match;

            if (tag) {
                const isClosing = fullMatch.startsWith("</");

                switch (tag) {
                    case "b":
                        isClosing ? styleStack.pop() : styleStack.push({ fontWeight: "bold" });
                        break;
                    case "i":
                        isClosing ? styleStack.pop() : styleStack.push({ fontStyle: "italic" });
                        break;
                    case "u":
                        isClosing ? styleStack.pop() : styleStack.push({ textDecorationLine: "underline" });
                        break;
                    case "s":
                    case "strike":
                        isClosing ? styleStack.pop() : styleStack.push({ textDecorationLine: "line-through" });
                        break;
                    case "ul":
                        listType = isClosing ? null : 'ul';
                        listIndex = 1;
                        break;
                    case "ol":
                        listType = isClosing ? null : 'ol';
                        listIndex = 1;
                        break;
                    case "li":
                        inListItem = !isClosing;
                        break;
                }

                currentStyle = styleStack.reduce((acc, s) => ({ ...acc, ...s }), {});
            } else if (text) {
                let prefix = "";
                if (inListItem) {
                    prefix = listType === "ul" ? "• " : listType === "ol" ? `${listIndex++}. ` : "";
                }

                result.push(
                    <Text key={`text-${index++}`} style={currentStyle}>
                        {prefix + text.trim() + (inListItem ? "\n" : "")}
                    </Text>
                );
            }
        }

        return <Text>{result}</Text>;
    }
}

const htmlFormatter = new CometChatHTMLFormatter();
export const getTextFormatters = () => { return [htmlFormatter];}