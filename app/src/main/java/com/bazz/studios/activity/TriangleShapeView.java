package com.bazz.studios.activity;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.util.AttributeSet;
import android.view.View;

/**
 * Created by mobility on 29/10/15.
 */
public class TriangleShapeView extends View {

    public TriangleShapeView(Context context) {
        super(context);
    }

    public TriangleShapeView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public TriangleShapeView(Context context, AttributeSet attrs) {
        super(context, attrs);
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
