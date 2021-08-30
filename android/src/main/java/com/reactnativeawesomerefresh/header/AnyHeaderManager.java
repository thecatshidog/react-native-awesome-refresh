package com.reactnativeawesomerefresh.header;

import android.graphics.Color;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.reactnativeawesomerefresh.awesomerefreshlayout.SpinnerStyleConstants;

import java.util.HashMap;

/**
 * Created by painter.g on 2018/3/12.
 */

public class AnyHeaderManager extends ViewGroupManager<AnyHeader> {
    @Override
    public String getName() {
        return "RCTAnyHeader";
    }

    @Override
    protected AnyHeader createViewInstance(ThemedReactContext reactContext) {
        return new AnyHeader(reactContext);
    }

    /**
     * 设置主调色
     * @param view
     * @param primaryColor
     */
    @ReactProp(name = "primaryColor")
    public void setPrimaryColor(AnyHeader view, String primaryColor){
        if(primaryColor!=null && !"".equals(primaryColor)){
            view.setPrimaryColor(Color.parseColor(primaryColor));
        }
    }

    /**
     * 设置spinnerStyle
     * @param view
     * @param spinnerStyle
     */
    @ReactProp(name = "spinnerStyle")
    public void setSpinnerStyle(AnyHeader view,String spinnerStyle){
        view.setSpinnerStyle(SpinnerStyleConstants.SpinnerStyleMap.get(spinnerStyle));
    }
}
