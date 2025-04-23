package com.cropcircle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;

import android.os.Handler;
import android.widget.ImageView;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "CropCircle";
    }
@Override
protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, true);
    super.onCreate(savedInstanceState);
}


    /**
     * Returns the instance of the ReactActivityDelegate. We use DefaultReactActivityDelegate
     * which allows you to enable New Architecture with a single boolean flag.
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(
            this,
            getMainComponentName(),
            DefaultNewArchitectureEntryPoint.getFabricEnabled() // equivalent to fabricEnabled in Kotlin
        );
    }
}
