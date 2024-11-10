#include <WiFi.h>
#include <HTTPClient.h>
#include "time.h"
#include <Arduino.h>
#include <ArduinoJson.h>

#define BUTTON1 26
#define BUTTON2 25
#define BUTTON3 33
#define BUTTON4 32

#define BUZZER 15
#define BUZZER_PWM_CHANNEL 0
#define LED1_PWM_CHANNEL 1
#define LED2_PWM_CHANNEL 2
#define LED3_PWM_CHANNEL 3
#define LED4_PWM_CHANNEL 4
#define PWM_RESOLUTION 8
#define PWM_FREQUENCY 5000
#define NOTE_DURATION 500

#define VOL_MOD 0.1

#define LED1 13
#define LED2 12
#define LED3 14
#define LED4 27

bool beeping = false;
bool angry = false;

int led1PWM = 0;
int led2PWM = 0;
int led3PWM = 0;
int led4PWM = 0;

int b1State = 0;
int b2State = 0;
int b3State = 0;
int b4State = 0;
const char* bigHost = "https://vitavault-ddba4-default-rtdb.firebaseio.com/PillBoxes.json";
const char* host1 = "https://vitavault-ddba4-default-rtdb.firebaseio.com/PillBoxes/PillBox1.json"; 
const char* host2 = "https://vitavault-ddba4-default-rtdb.firebaseio.com/PillBoxes//PillBox2.json"; 
const char* host3 = "https://vitavault-ddba4-default-rtdb.firebaseio.com/PillBoxes//PillBox3.json"; 
const char* host4 = "https://vitavault-ddba4-default-rtdb.firebaseio.com/PillBoxes//PillBox4.json"; 
const char* pushcut = "https://api.pushcut.io/QsDtgUHpIVGC6Nvu4TPiw/notifications/It%E2%80%99s%20time%20to%20take%20your%20pills!";

unsigned long takeTime1 = 0;
unsigned long takeTime2 = 0;
unsigned long takeTime3 = 0;
unsigned long takeTime4 = 0;

int takeTimeInterval1 = 0;
int takeTimeInterval2 = 0;
int takeTimeInterval3 = 0;
int takeTimeInterval4 = 0;

String pillName1 = "";
String pillName2 = "";
String pillName3 = "";
String pillName4 = "";

bool textSent1 = false;
bool textSent2 = false;
bool textSent3 = false;
bool textSent4 = false;

long lastUpdate = millis();


const char* ssid = "servicenet";
const char* host = "www.google.com";

const char* ntpServer = "pool.ntp.org";
unsigned long Epoch_Time;

TaskHandle_t BuzzerTaskHandle;
long buzzerTime = millis();
bool buzzerState = false;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(BUTTON1,INPUT_PULLUP);
  pinMode(BUTTON2,INPUT_PULLUP);
  pinMode(BUTTON3,INPUT_PULLUP);
  pinMode(BUTTON4,INPUT_PULLUP);

  // setup pwm for leds
  ledcSetup(LED1_PWM_CHANNEL, PWM_FREQUENCY, PWM_RESOLUTION);
  ledcAttachPin(LED1, LED1_PWM_CHANNEL);
  ledcSetup(LED2_PWM_CHANNEL, PWM_FREQUENCY, PWM_RESOLUTION);
  ledcAttachPin(LED2, LED2_PWM_CHANNEL);
  ledcSetup(LED3_PWM_CHANNEL, PWM_FREQUENCY, PWM_RESOLUTION);
  ledcAttachPin(LED3, LED3_PWM_CHANNEL);
  ledcSetup(LED4_PWM_CHANNEL, PWM_FREQUENCY, PWM_RESOLUTION);
  ledcAttachPin(LED4, LED4_PWM_CHANNEL);
  
  // buzzer pwm
  ledcSetup(BUZZER_PWM_CHANNEL, PWM_FREQUENCY, PWM_RESOLUTION);
  ledcAttachPin(BUZZER, BUZZER_PWM_CHANNEL);
  

  WiFi.begin(ssid);          // Begin WiFi connection

  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");                 // Print dots while connecting
  }

  Serial.println("\nConnected to WiFi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  Serial.print("MAC Address: ");
  Serial.println(WiFi.macAddress()); 

  Serial.print("Configuring NTP Time Server: ");
  configTime(0, 0, ntpServer);

  Serial.println("Starting Buzzer Thread: ");
  xTaskCreatePinnedToCore(
    BuzzerTask,           // Function that implements the task
    "Buzzer Task",        // Name of the task
    1000,                 // Stack size (in words, not bytes)
    NULL,                 // Task input parameter
    1,                    // Priority of the task
    &BuzzerTaskHandle,    // Task handle
    1                     // Core to run the task on (0 or 1 for dual-core)
  );

  getTakeTimes();
}

void BuzzerTask(void * parameter) {
  // play startup tune first
  int tuneNotes = 4;
  const int tune[tuneNotes] = {
    127, 127, 50, 200
  };
  
  for (int i = 0; i < tuneNotes; i++) {
    ledcWrite(BUZZER_PWM_CHANNEL, tune[i] * VOL_MOD);
    vTaskDelay(200 / portTICK_PERIOD_MS);
    
    ledcWrite(BUZZER_PWM_CHANNEL, 0);    
    vTaskDelay(100 / portTICK_PERIOD_MS);
  }
  
  // do startup led animation
  ledStartupAnim();
    
  while (true) { 
    updateLeds(); 
    
    if(angry){
      continue;
    }

    if(Epoch_Time > takeTime1 || 
       Epoch_Time > takeTime2 || 
       Epoch_Time > takeTime3 || 
       Epoch_Time > takeTime4){
        if(buzzerTime + 500 < millis()){
          toggleBuzzer();
          buzzerTime = millis();
          beeping = true;
        }
    }else{
      ledcWrite(BUZZER_PWM_CHANNEL, 0);
      buzzerState = false;
      beeping = false;
    }
  }
}

void ledStartupAnim() {
  long start = millis();
  long dur = 2000;
  float startUpPeriodPercent = 0.25;
  long startUpPeriod = (int)(dur * startUpPeriodPercent);
  long led1Startup = start;
  long led2Startup = start + startUpPeriod;
  long led3Startup = start + startUpPeriod * 2;
  long led4Startup = start + startUpPeriod * 3;
  
  while (start + dur > millis()){
    
    long t = millis();
    
    float phase1 = (2.0 * PI * (max((long)0, t - led1Startup) % startUpPeriod)) / startUpPeriod;
    float phase2 = (2.0 * PI * (max((long)0, t - led2Startup) % startUpPeriod)) / startUpPeriod;
    float phase3 = (2.0 * PI * (max((long)0, t - led3Startup) % startUpPeriod)) / startUpPeriod;
    float phase4 = (2.0 * PI * (max((long)0, t - led4Startup) % startUpPeriod)) / startUpPeriod;
    
    led1PWM = 255 - constrain((int)(127 * sin(phase1) + 127), 0, 255);
    led2PWM = 255 - constrain((int)(127 * sin(phase2) + 127), 0, 255);
    led3PWM = 255 - constrain((int)(127 * sin(phase3) + 127), 0, 255);
    led4PWM = 255 - constrain((int)(127 * sin(phase4) + 127), 0, 255);
    
    ledcWrite(LED1_PWM_CHANNEL, led1PWM);
    ledcWrite(LED2_PWM_CHANNEL, led2PWM);
    ledcWrite(LED3_PWM_CHANNEL, led3PWM);
    ledcWrite(LED4_PWM_CHANNEL, led4PWM);
  }
}

void toggleBuzzer(){
  if(!buzzerState){
    ledcWrite(BUZZER_PWM_CHANNEL, 127 * VOL_MOD);
  }else{
    ledcWrite(BUZZER_PWM_CHANNEL, 0);
  }
  buzzerState = !buzzerState;
}

void sendTextMessage(String message){
    HTTPClient http;
    http.begin(pushcut);
    http.addHeader("Content-Type", "application/json");

    String putString = "{\"title\":\"It's time to take your pills!\", \"text\":\"" + message + "\"}";
    
    int httpResponseCode = http.POST(putString);
    http.end();
}

void updateLeds() {
  if(Epoch_Time > takeTime1){
    ledcWrite(LED1_PWM_CHANNEL, led1PWM);
  }else{
    ledcWrite(LED1_PWM_CHANNEL, 0);
  }
  if(Epoch_Time > takeTime2){
    ledcWrite(LED2_PWM_CHANNEL, led2PWM);
  }else{
    ledcWrite(LED2_PWM_CHANNEL, 0);
  }
  if(Epoch_Time > takeTime3){
    ledcWrite(LED3_PWM_CHANNEL, led3PWM);
  }else{
    ledcWrite(LED3_PWM_CHANNEL, 0);
  }

  if(Epoch_Time > takeTime4){
    ledcWrite(LED4_PWM_CHANNEL, led4PWM);
  }else{
    ledcWrite(LED4_PWM_CHANNEL, 0);
  }
  
  unsigned long breathePeriod = 500;
  float phase1 = (2.0 * PI * ((millis() - takeTime1) % breathePeriod)) / breathePeriod;
  float phase2 = (2.0 * PI * ((millis() - takeTime2) % breathePeriod)) / breathePeriod;
  float phase3 = (2.0 * PI * ((millis() - takeTime3) % breathePeriod)) / breathePeriod;
  float phase4 = (2.0 * PI * ((millis() - takeTime4) % breathePeriod)) / breathePeriod;
  
  led1PWM = constrain((int)(100 * sin(phase1) + 150), 0, 255);
  led2PWM = constrain((int)(100 * sin(phase2) + 150), 0, 255);
  led3PWM = constrain((int)(100 * sin(phase3) + 150), 0, 255);
  led4PWM = constrain((int)(100 * sin(phase4) + 150), 0, 255);
}

void getTakeTimes(){
  HTTPClient http;
  http.begin(bigHost);
  // Send HTTP GET request
  int httpResponseCode = http.GET();
  
  if (httpResponseCode>0) {
    // takeTime1 = parseInt(http.getString());
    String payload = http.getString();
    StaticJsonBuffer<1000> JSONBuffer;
    JsonObject& parsed = JSONBuffer.parseObject(payload);
    if (!parsed.success()) { //Check for errors in parsing
      Serial.println("Parsing failed");
      return;
    }

    takeTime1 = parsed["PillBox1"]["takeTime"];
    takeTime2 = parsed["PillBox2"]["takeTime"];
    takeTime3 = parsed["PillBox3"]["takeTime"];
    takeTime4 = parsed["PillBox4"]["takeTime"];

    takeTimeInterval1 = parsed["PillBox1"]["takeTimeInterval"];
    takeTimeInterval2 = parsed["PillBox2"]["takeTimeInterval"];
    takeTimeInterval3 = parsed["PillBox3"]["takeTimeInterval"];
    takeTimeInterval4 = parsed["PillBox4"]["takeTimeInterval"];

    pillName1 = parsed["PillBox1"]["name"].as<String>();;
    pillName2 = parsed["PillBox2"]["name"].as<String>();;
    pillName3 = parsed["PillBox3"]["name"].as<String>();;
    pillName4 = parsed["PillBox4"]["name"].as<String>();;
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();
}

void updateFirebase(const char* host, int interval){
  HTTPClient http;

  http.begin(host);
  http.addHeader("Content-Type", "application/json");

  Epoch_Time = Get_Epoch_Time();

  String putString = "{\"time\":" + String(Epoch_Time) + ", \"takeTime\":" + String(Epoch_Time+interval)+"}";

  int httpResponseCode = http.PATCH(putString);
  http.end();
}

// Get_Epoch_Time() Function that gets current epoch time
unsigned long Get_Epoch_Time() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    //Serial.println("Failed to obtain time");
    return(0);
  }
  time(&now);
  return now;
}

void loop() {
  // polling logic
  if(lastUpdate + 3000 < millis()){
    lastUpdate = millis();
    getTakeTimes();
    Epoch_Time = Get_Epoch_Time();
  }

  int b1NewState = digitalRead(BUTTON1);
  int b2NewState = digitalRead(BUTTON2);
  int b3NewState = digitalRead(BUTTON3);
  int b4NewState = digitalRead(BUTTON4);

  // check if opened too early
  angry = ((b1NewState == 1 && Epoch_Time < takeTime1) ||
          (b2NewState == 1 && Epoch_Time < takeTime2) ||
          (b3NewState == 1 && Epoch_Time < takeTime3) ||
          (b4NewState == 1 && Epoch_Time < takeTime4));
  if(angry){
    ledcWrite(BUZZER_PWM_CHANNEL, 255 * VOL_MOD);
  }else if(!beeping){
    ledcWrite(BUZZER_PWM_CHANNEL, 0);
  }

  if(b1State == 1 && b1NewState == 0){
    takeTime1 = Epoch_Time + takeTimeInterval1;
    // digitalWrite(LED1, LOW);
    updateFirebase(host1, takeTimeInterval1);
  }
  if(b2State == 1 && b2NewState == 0){
    takeTime2 = Epoch_Time + takeTimeInterval2;
    // digitalWrite(LED2, LOW);
    updateFirebase(host2, takeTimeInterval2);
  }
  if(b3State == 1 && b3NewState == 0){
    takeTime3 = Epoch_Time + takeTimeInterval3;
    // digitalWrite(LED3, LOW);
    updateFirebase(host3, takeTimeInterval3);
  }
  if(b4State == 1 && b4NewState == 0){
    takeTime4 = Epoch_Time + takeTimeInterval4;
    // digitalWrite(LED4, LOW);
    updateFirebase(host4, takeTimeInterval4);
  }

  b1State = b1NewState;
  b2State = b2NewState;
  b3State = b3NewState;
  b4State = b4NewState;


  // text message stuff
  if(Epoch_Time > takeTime1){
    if(!textSent1){
      String message = "You need to take " + pillName1 + ". It's in compartment #1!";
      sendTextMessage(message);
      textSent1 = true;
    }
  }else{
    textSent1 = false;
  }
  if(Epoch_Time > takeTime2){
    if(!textSent2){
      String message = "You need to take " + pillName2 + ". It's in compartment #2!";
      sendTextMessage(message);
      textSent2 = true;
    }
  }else{
    textSent2 = false;
  }

  if(Epoch_Time > takeTime3){
    if(!textSent3){
      String message = "You need to take " + pillName3 + ". It's in compartment #3!";
      sendTextMessage(message);
      textSent3 = true;
    }
  }else{
    textSent3 = false;
  }

  if(Epoch_Time > takeTime4){
    if(!textSent4){
      String message = "You need to take " + pillName4 + ". It's in compartment #4!";
      sendTextMessage(message);
      textSent4 = true;
    }
  }else{
    textSent4 = false;
  }
}
