package com.bazz.studios.activity;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.util.AttributeSet;
import android.widget.Button;

/**
 * Created by mobility on 29/10/15.
 */
public class TriangleShapeButton extends Button {


    public TriangleShapeButton(Context context) {
        super(context);
        setFocusable(true);
        setBackgroundColor(Color.BLACK);
        setClickable(true);
    }

    public TriangleShapeButton(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public TriangleShapeButton(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        int w = getWidth() / 2;

        Path path = new Path();
        path.moveTo(w, 0);
        path.lineTo(2 * w, 0);
        path.lineTo(2 * w, w);
        path.lineTo(w, 0);
        path.close();

        Paint p = new Paint();
        p.setColor(Color.RED);

        canvas.drawPath(path, p);
    }

}
