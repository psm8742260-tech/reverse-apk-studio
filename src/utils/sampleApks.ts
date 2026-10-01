import JSZip from 'jszip';

export interface SampleApkTemplate {
  id: string;
  name: string;
  packageName: string;
  version: string;
  description: string;
  sizeKb: number;
  badge: string;
}

export const SAMPLE_APK_TEMPLATES: SampleApkTemplate[] = [
  {
    id: 'cyberdash',
    name: 'CyberDash Pro (Mobile Web APK)',
    packageName: 'com.cyberdash.app',
    version: '2.4.0',
    description: 'High-tech fintech dashboard with live metrics, dark theme, and interactive charts.',
    sizeKb: 42,
    badge: 'Popular',
  },
  {
    id: 'weatherpro',
    name: 'WeatherPro Mobile (Cordova APK)',
    packageName: 'net.weatherpro.mobile',
    version: '1.8.5',
    description: 'Glassmorphism weather app with 7-day forecast, hourly radar, and search.',
    sizeKb: 38,
    badge: 'PWA WebApp',
  },
  {
    id: 'retroarcade',
    name: 'RetroArcade Cyber (HTML5 Game APK)',
    packageName: 'org.retroarcade.cyber',
    version: '3.0.1',
    description: 'Canvas arcade game with sound generator, retro CRT filter, and high scores.',
    sizeKb: 55,
    badge: 'HTML5 Game',
  },
];

export async function createSampleApkBlob(templateId: string): Promise<{ blob: Blob; filename: string }> {
  const zip = new JSZip();

  if (templateId === 'cyberdash') {
    // Android Manifest XML representation
    zip.file('AndroidManifest.xml', `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.cyberdash.app"
    android:versionCode="20400"
    android:versionName="2.4.0">
    <uses-sdk android:minSdkVersion="24" android:targetSdkVersion="34" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <application
        android:label="CyberDash Pro"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`);

    // Additional Android App Files for Full Decompilation Inspection
    zip.file('res/values/strings.xml', `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">CyberDash Pro</string>
    <string name="welcome_title">Welcome to CyberDash Engine</string>
    <string name="api_endpoint">https://api.cyberdash.app/v2</string>
    <string name="sha256_cert">63:BD:D8:7F:F0:5C:67:21:A9:1F:8A:9F:D8:72:C1:0D:9D:44:0A:79:4E:74:49:2D:89:B8:1C:63:47:CD:3C:1D</string>
</resources>`);

    zip.file('res/layout/activity_main.xml', `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    <WebView
        android:id="@+id/webView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</LinearLayout>`);

    zip.file('smali/com/cyberdash/app/MainActivity.smali', `.class public Lcom/cyberdash/app/MainActivity;
.super Landroid/app/Activity;
.source "MainActivity.java"

.method public onCreate(Landroid/os/Bundle;)V
    .registers 2
    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V
    return-void
.end method`);

    zip.file('smali/com/cyberdash/app/NetworkClient.smali', `.class public Lcom/cyberdash/app/NetworkClient;
.super Ljava/lang/Object;

.method public static fetchMetrics()Ljava/lang/String;
    .registers 1
    const-string v0, "https://api.cyberdash.app/v2/metrics"
    return-object v0
.end method`);

    zip.file('smali/com/cyberdash/app/SecurityManager.smali', `.class public Lcom/cyberdash/app/SecurityManager;
.super Ljava/lang/Object;

.method public verifySignature()Z
    .registers 1
    const/4 v0, 0x1
    return v0
.end method`);

    zip.file('java/com/cyberdash/app/MainActivity.java', `package com.cyberdash.app;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebSettings;

public class MainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        WebView webView = findViewById(R.id.webView);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        webView.clearCache(true);
        
        webView.loadUrl("file:///android_asset/www/index.html");
    }
}`);

    zip.file('res/values/colors.xml', `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary">#0284c7</color>
    <color name="primary_dark">#0369a1</color>
    <color name="accent">#38bdf8</color>
    <color name="background">#0f172a</color>
</resources>`);

    zip.file('res/values/styles.xml', `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="android:Theme.Material.Light.NoActionBar">
        <item name="android:colorPrimary">@color/primary</item>
        <item name="android:windowBackground">@color/background</item>
    </style>
</resources>`);

    zip.file('res/values/dimens.xml', `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <dimen name="activity_horizontal_margin">16dp</dimen>
    <dimen name="activity_vertical_margin">16dp</dimen>
</resources>`);

    zip.file('res/drawable/ic_launcher.xml', `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp" android:height="108dp" android:viewportWidth="108" android:viewportHeight="108">
    <path android:fillColor="#0284c7" android:pathData="M0,0h108v108h-108z"/>
</vector>`);

    zip.file('res/xml/network_security_config.xml', `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="false" />
</network-security-config>`);

    zip.file('res/raw/app_config.json', JSON.stringify({
      version: "2.4.0",
      environment: "production",
      features: { enableAnalytics: true, enableSslPinning: true }
    }, null, 2));

    zip.file('classes.dex', '[Compiled Dalvik Executable DEX Binary Data]');
    zip.file('classes2.dex', '[Secondary Dalvik Executable DEX Binary Data]');
    zip.file('lib/arm64-v8a/libcyber_native.so', '[ARM64 Shared Native Library Binary]');
    zip.file('lib/armeabi-v7a/libcyber_native.so', '[ARMv7 Shared Native Library Binary]');
    zip.file('lib/x86_64/libcyber_native.so', '[x86_64 Shared Native Library Binary]');

    zip.file('proguard-rules.pro', `-keep class com.cyberdash.app.** { *; }
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}`);

    zip.file('gradle.properties', `org.gradle.jvmargs=-Xmx2048m
android.useAndroidX=true
android.enableJetifier=true`);

    zip.file('build.gradle', `plugins {
    id 'com.android.application'
}
android {
    compileSdk 34
    defaultConfig {
        applicationId "com.cyberdash.app"
        minSdk 24
        targetSdk 34
        versionCode 20400
        versionName "2.4.0"
    }
}`);

    // Web Root assets
    zip.file('assets/www/index.html', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CyberDash Pro</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app-container">
    <header class="header">
      <div class="logo">⚡ CYBERDASH <span class="version">v2.4</span></div>
      <div class="status-pill">LIVE ENGINE</div>
    </header>
    
    <main class="content">
      <div class="card stat-card">
        <h3>Total Revenue</h3>
        <div class="big-num">$128,450.00</div>
        <div class="trend positive">+18.4% this month</div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h3>Active Sessions</h3>
          <div class="med-num" id="sessionCount">4,289</div>
          <button class="btn" id="refreshBtn">Sync Metrics</button>
        </div>
        <div class="card">
          <h3>Server Load</h3>
          <div class="progress-bar"><div class="fill" style="width: 32%;"></div></div>
          <small>32% CPU Usage</small>
        </div>
      </div>

      <div class="card">
        <h3>Decompiled Logs</h3>
        <ul id="logList" class="log-list">
          <li>[SYSTEM] Assets loaded from /assets/www/</li>
          <li>[NET] Socket connected to wss://api.cyberdash.app</li>
        </ul>
      </div>
    </main>
  </div>
  <script src="app.js"></script>
</body>
</html>`);

    zip.file('assets/www/style.css', `* { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
body { background: #0f172a; color: #f8fafc; padding: 16px; min-height: 100vh; }
.app-container { max-width: 600px; margin: 0 auto; }
.header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid #334155; margin-bottom: 16px; }
.logo { font-weight: 800; font-size: 1.25rem; color: #38bdf8; letter-spacing: -0.5px; }
.version { font-size: 0.75rem; background: #0284c7; padding: 2px 6px; border-radius: 4px; color: white; }
.status-pill { background: #10b98122; color: #34d399; border: 1px solid #10b981; font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 99px; }
.card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
.stat-card h3 { color: #94a3b8; font-size: 0.875rem; margin-bottom: 8px; }
.big-num { font-size: 2.25rem; font-weight: 800; color: #38bdf8; }
.med-num { font-size: 1.5rem; font-weight: 700; color: #f8fafc; margin: 8px 0; }
.trend.positive { color: #34d399; font-size: 0.875rem; font-weight: 600; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.btn { background: #0284c7; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; width: 100%; }
.btn:hover { background: #0369a1; }
.progress-bar { background: #334155; height: 8px; border-radius: 4px; overflow: hidden; margin: 12px 0 6px 0; }
.fill { background: #38bdf8; height: 100%; transition: width 0.3s; }
.log-list { list-style: none; font-family: monospace; font-size: 0.8rem; color: #a1a1aa; line-height: 1.6; }`);

    zip.file('assets/www/app.js', `console.log("CyberDash App Initialized");
document.getElementById('refreshBtn')?.addEventListener('click', () => {
  const countEl = document.getElementById('sessionCount');
  if (countEl) {
    const nextVal = Math.floor(4000 + Math.random() * 800);
    countEl.textContent = nextVal.toLocaleString();
  }
  const logList = document.getElementById('logList');
  if (logList) {
    const li = document.createElement('li');
    li.textContent = \`[\${new Date().toLocaleTimeString()}] Metrics synced via AI Master Studio Client\`;
    logList.prepend(li);
  }
});`);

    zip.file('assets/www/manifest.json', JSON.stringify({
      name: "CyberDash Pro",
      short_name: "CyberDash",
      start_url: "index.html",
      display: "standalone",
      background_color: "#0f172a",
      theme_color: "#0284c7"
    }, null, 2));

  } else if (templateId === 'weatherpro') {
    zip.file('AndroidManifest.xml', `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="net.weatherpro.mobile">
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <application android:label="WeatherPro"></application>
</manifest>`);

    zip.file('www/index.html', `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>WeatherPro Mobile</title>
  <style>
    body { background: linear-gradient(135deg, #0284c7, #4f46e5); color: white; font-family: sans-serif; padding: 20px; text-align: center; }
    .temp { font-size: 4rem; font-weight: bold; margin: 10px 0; }
    .condition { font-size: 1.2rem; opacity: 0.9; }
    .forecast { display: flex; justify-content: space-around; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); padding: 15px; border-radius: 16px; margin-top: 25px; }
    .day { font-size: 0.9rem; }
  </style>
</head>
<body>
  <h2>🌤️ San Francisco, CA</h2>
  <div class="temp">72°F</div>
  <div class="condition">Partly Cloudy • Humidity 45%</div>
  <div class="forecast">
    <div class="day"><b>Mon</b><br>74°</div>
    <div class="day"><b>Tue</b><br>68°</div>
    <div class="day"><b>Wed</b><br>71°</div>
    <div class="day"><b>Thu</b><br>75°</div>
  </div>
</body>
</html>`);

  } else {
    // retroarcade
    zip.file('AndroidManifest.xml', `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="org.retroarcade.cyber">
    <application android:label="RetroArcade"></application>
</manifest>`);

    zip.file('index.html', `<!DOCTYPE html>
<html>
<head>
  <title>RetroArcade Cyber</title>
  <style>
    body { background: #000; color: #0f0; font-family: monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    canvas { border: 2px solid #0f0; background: #111; box-shadow: 0 0 20px #0f05; }
    h1 { margin-bottom: 8px; text-shadow: 0 0 10px #0f0; }
  </style>
</head>
<body>
  <h1>👾 RETRO ARCADE 1984</h1>
  <canvas id="c" width="320" height="240"></canvas>
  <p>Use Left / Right Arrows or Touch Controls</p>
  <script>
    const c = document.getElementById('c');
    const ctx = c.getContext('2d');
    let x = 150;
    function draw() {
      ctx.fillStyle = '#111'; ctx.fillRect(0,0,320,240);
      ctx.fillStyle = '#0f0'; ctx.fillRect(x, 210, 30, 10);
      x = (x + 1) % 290;
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  return {
    blob: content,
    filename: `${templateId}_app.apk`,
  };
}
