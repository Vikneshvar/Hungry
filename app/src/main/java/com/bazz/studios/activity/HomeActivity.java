package com.bazz.studios.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.bazz.studios.R;
import com.parse.ParseAnalytics;
import com.parse.ParseObject;

public class HomeActivity extends Activity implements View.OnClickListener {

    Button btn_MyInvites;
    Button btn_IAmHungry;
    Button btn_MyFriends;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        init();
        ParseObject gameScore = new ParseObject("GameScore");
        gameScore.put("score", 1337);
        gameScore.put("playerName", "Sean Plott");
        gameScore.put("cheatMode", false);
        gameScore.saveInBackground();
        ParseAnalytics.trackAppOpenedInBackground(getIntent());
    }

    private void init() {
        btn_MyInvites = (Button) findViewById(R.id.btn_invite);
        btn_IAmHungry = (Button) findViewById(R.id.btn_hungry);
        btn_MyFriends = (Button) findViewById(R.id.btn_friends);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_home, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void clicked(View view) {
        System.out.println("clicked");
        Toast.makeText(this, "clickedd", Toast.LENGTH_LONG);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btn_invite:
                Intent inviteIntent = new Intent(this, MyInvitesActivity.class);
                startActivity(inviteIntent);
                break;
            case R.id.btn_hungry:
                Intent hungryIntent = new Intent(this, IAmHungryActivity.class);
                startActivity(hungryIntent);
                break;
            case R.id.btn_friends:
                Intent friendsIntent = new Intent(this, MyFriendsActivity.class);
                startActivity(friendsIntent);
                break;
        }
    }
}
