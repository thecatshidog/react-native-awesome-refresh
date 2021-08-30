package com.reactnativeawesomerefresh;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import com.reactnativeawesomerefresh.awesomerefreshlayout.RCTSpinnerStyleModule;
import com.reactnativeawesomerefresh.header.AnyHeaderManager;
import com.reactnativeawesomerefresh.header.ClassicsHeaderManager;
import com.reactnativeawesomerefresh.header.DefaultHeaderMananger;
import com.reactnativeawesomerefresh.header.MaterialHeaderManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;


public class AwesomeRefreshPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                new RCTSpinnerStyleModule(reactContext)
        );
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new AwesomeRefreshViewManager(),
                new ClassicsHeaderManager(),
                new MaterialHeaderManager(),
                new AnyHeaderManager(),
                new DefaultHeaderMananger()
              );
    }
}
