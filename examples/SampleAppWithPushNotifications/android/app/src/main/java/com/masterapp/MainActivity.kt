package com.cometchat.sampleapp.reactnative.android

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import androidx.annotation.NonNull
import io.wazo.callkeep.RNCallKeepModule 


class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "sampleapp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
   
  override fun onRequestPermissionsResult(
    requestCode: Int,
    @NonNull permissions: Array<out String>,
    @NonNull grantResults: IntArray
) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    when (requestCode) {
        RNCallKeepModule.REQUEST_READ_PHONE_STATE -> {
            RNCallKeepModule.onRequestPermissionsResult(requestCode, permissions, grantResults)
        }
    }
}

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
