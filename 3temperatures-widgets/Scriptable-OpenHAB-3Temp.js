// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: home;

// Author: @sebasanblas
// Date: 20/04/2021
// Description: Widget to show three different temperatures

/**************
Version 1.0.2

Changelog:
    v1.0.2:
            - Automatic encoding username and password
    v1.0.1:
            - Small color correction
            - Add method to parse a string and returns a floating-point number
            - Define two decimal places in values
    v1.0.0:
            - Initial version

Credits: 
  - Modification of: m33x@Github (https://gist.github.com/m33x/62f6e8f6eab546e4b3a854695ea8c3a8)
**************/

///////////////////////////////////////////////////
//            User config connection
///////////////////////////////////////////////////

const user = "my@email.com"
const password = "password"
const IP = "iptoconnect" // Default "myopenhab.org"

///////////////////////////////////////////////////
//                   Items
///////////////////////////////////////////////////

const name_title = "Temperatures"; // Define a title, like: House, Temperatures, etc.

const input_1_name = "input_1_name: "; // Define a item name to show, like: Room, Bathroom, etc.
const input_1 = "iteminput_1"; // Place the name of the item to be analyzed, the same as OpenHAB.

const input_2_name = "input_2_name: ";
const input_2 = "iteminput_2"; 

const input_3_name = "input_3_name: ";
const input_3 = "iteminput_3"; 

///////////////////////////////////////////////////
//            Variable initialization
///////////////////////////////////////////////////

const principal_link = `https://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${IP}:443/rest/items/`;

let widget = new ListWidget();
// widget.setPadding(8, 10, 0, 10);

await info_state()
await createWidget();
Script.setWidget(widget);
Script.complete();

if (config.runsInApp) {
    widget.presentSmall();
  }

async function createWidget(items) {

//     let widget = new ListWidget();
// Add background gradient
    let gradient = new LinearGradient();
    gradient.locations = [0, 1];
    gradient.colors = [
      new Color("#F0F8FF")
    ]
    widget.backgroundGradient = gradient

//     widget.addSpacer(5);
    // Header

    var header_stack = widget.addStack();
    header_stack.centerAlignContent();
    header_stack.addSpacer();
    var title = header_stack.addText(name_title);
    title.font = Font.boldRoundedSystemFont(11);
    title.textColor = Color.black();
    header_stack.addSpacer();
    var symbol = SFSymbol.named('house').image;  
    header_stack.centerAlignContent()
    var symbol_image = header_stack.addImage(symbol);
    symbol_image.imageSize = new Size(20,20);
    symbol_image.tintColor = Color.black();
    header_stack.addSpacer();

// Space
var space_1 = widget.addStack();
var space_1_space = space_1.addText("");

//// Item 1
var item_1 = widget.addStack();
item_1.centerAlignContent();
item_1.addSpacer();

//Título
var item_1_title = item_1.addText(input_1_name);
item_1_title.font = Font.boldRoundedSystemFont(8);
item_1_title.textColor = Color.black();

//Valor
item_1.addSpacer(3);
const item_1_value = parseFloat((await info_state(input_1)).match(/[0-9.]+/g)[0]).toFixed(2);
let item_1_txt = item_1.addText(item_1_value);
if (item_1_value < 5) { 
     item_1_txt.textColor =  new Color("#9400D3");
 } else if (item_1_value < 20){
     item_1_txt.textColor = new Color("#1E90FF");
 } else if (item_1_value < 30){
     item_1_txt.textColor = new Color("#FF8C00");
 } else {
     item_1_txt.textColor = new Color("#FF0000");
 }
 item_1_txt.font = Font.boldMonospacedSystemFont(11);

// Icono
item_1.addSpacer(3);
if(item_1_value < 5) {
     var item_1_symbol = SFSymbol.named('thermometer.snowflake').image;
 } else if (item_1_value < 20){
     var item_1_symbol = SFSymbol.named('thermometer').image;
 } else {
     var item_1_symbol = SFSymbol.named('thermometer.sun').image;
 }
 var item_1_symbol_image = item_1.addImage(item_1_symbol);
 item_1_symbol_image.imageSize = new Size(15, 15);
 item_1_symbol_image.tintColor = Color.black();
item_1.addSpacer();

// Space
var space_2 = widget.addStack();
var space_2_space = space_2.addText("");

//// Item 2
var item_2 = widget.addStack();
item_2.centerAlignContent();
item_2.addSpacer();

//Título
var item_2_title = item_2.addText(input_2_name);
item_2_title.font = Font.boldRoundedSystemFont(8);
item_2_title.textColor = Color.black();

//Valor
item_2.addSpacer(3);
const item_2_value = parseFloat((await info_state(input_2)).match(/[0-9.]+/g)[0]).toFixed(2);
let item_2_txt = item_2.addText(item_2_value);
if (item_2_value < 5) { 
     item_2_txt.textColor =  new Color("#9400D3");
 } else if (item_2_value < 20){
     item_2_txt.textColor = new Color("#1E90FF");
 } else if (item_2_value < 30){
     item_2_txt.textColor = new Color("#FF8C00");
 } else {
     item_2_txt.textColor = new Color("#FF0000");
 }
 item_2_txt.font = Font.boldMonospacedSystemFont(11);

// Icono
item_2.addSpacer(3);
if(item_2_value < 5) {
     var item_2_symbol = SFSymbol.named('thermometer.snowflake').image;
 } else if (item_2_value < 20){
     var item_2_symbol = SFSymbol.named('thermometer').image;
 } else {
     var item_2_symbol = SFSymbol.named('thermometer.sun').image;
 }
 var item_2_symbol_image = item_2.addImage(item_2_symbol);
 item_2_symbol_image.imageSize = new Size(15, 15);
 item_2_symbol_image.tintColor = Color.black();
item_2.addSpacer();

// Space
var space_3 = widget.addStack();
var space_3_space = space_3.addText("");

//// Item 3
var item_3 = widget.addStack();
item_3.centerAlignContent();
item_3.addSpacer();

//Título
var item_3_title = item_3.addText(input_3_name);
item_3_title.font = Font.boldRoundedSystemFont(8);
item_3_title.textColor = Color.black();

//Valor
item_3.addSpacer(3);
const item_3_value = parseFloat((await info_state(input_3)).match(/[0-9.]+/g)[0]).toFixed(2);
let item_3_txt = item_3.addText(item_3_value);
if (item_3_value < 5) { 
     item_3_txt.textColor = new Color("#9400D3");
 } else if (item_3_value < 20){
     item_3_txt.textColor = new Color("#1E90FF");
 } else if (item_3_value < 30){
     item_3_txt.textColor = new Color("#FF8C00");
 } else {
     item_3_txt.textColor = new Color("#FF0000");
 }
 item_3_txt.font = Font.boldMonospacedSystemFont(11);

// Icono
item_3.addSpacer(3);
if(item_3_value < 5) {
     var item_3_symbol = SFSymbol.named('thermometer.snowflake').image;
 } else if (item_3_value < 20){
     var item_3_symbol = SFSymbol.named('thermometer').image;
 } else {
     var item_3_symbol = SFSymbol.named('thermometer.sun').image;
 }
 var item_3_symbol_image = item_3.addImage(item_3_symbol);
 item_3_symbol_image.imageSize = new Size(15, 15);
 item_3_symbol_image.tintColor = Color.black();
item_3.addSpacer();

// Space
var space_4 = widget.addStack();
var space_4_space = space_4.addText("");

// Space
var space_5 = widget.addStack();
var space_5_space = space_5.addText("");

// Last Update

const lastupdate = widget.addStack();
lastupdate.centerAlignContent();
lastupdate.addSpacer();
var lastupdate_symbol = SFSymbol.named('clock').image;
var lastupdate_symbol_image = lastupdate.addImage(lastupdate_symbol);
lastupdate_symbol_image.imageOpacity = 0.3;
lastupdate_symbol_image.imageSize = new Size(10,10);
lastupdate_symbol_image.tintColor = Color.black();
lastupdate.addSpacer(3);

let refreshLabel = lastupdate.addText("Last updated: " + new Date().toLocaleTimeString())
refreshLabel.textOpacity = .90;
refreshLabel.font = Font.boldMonospacedSystemFont(5);
lastupdate.addSpacer();
// Return
    return widget;
}

// Functions
async function info_state(item){

    let url = `${principal_link}${item}`
  
    let API__URL = url ;
  
    let API__REQ = new Request(API__URL);
    
    let API__RES = await API__REQ.loadJSON();
  
    return API__RES.state;

  }