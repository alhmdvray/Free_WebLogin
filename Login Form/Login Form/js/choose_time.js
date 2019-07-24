firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("out_div").style.display = "none";
    document.getElementById("Card_div").style.display = "none";
    var user = firebase.auth().currentUser;
    // Get idToken
    user.getIdToken().then(function (token) {
      console.log(token);
    });
    if(user != null){
      // var email_id = user.email;
      // var db = firebase.firestore();
      // var NowDate=new Date();
      // var h=NowDate.getHours();
      // var m=NowDate.getMinutes();
      // var s=NowDate.getSeconds();　
      // var ToDay = NowDate.getFullYear()+ "年" + (NowDate.getMonth()+1) + "月" + NowDate.getDate() + "日";
      // var HMS = h + "時" + m + "分" + s + "秒";
      // document.getElementById('showbox').innerHTML = "<h3>打卡時間 :<h3/> " + HMS;
      // document.getElementById("user_para").innerHTML = "<h3>使用者帳戶 :<h3/> " + email_id;

      // db.collection(email_id).doc(ToDay).set({
      //   上班時間: HMS
      // },{merge: true}).then(() => {
      //   console.log('set data successful');
      // });
    }

  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("out_div").style.display = "block";
  }
});

function PunchCard(){
  var user = firebase.auth().currentUser;
  user.getIdToken().then(function (token) {
      console.log(token);
    });
  if(user != null){
      var email_id = user.email;
      var db = firebase.firestore();
      var NowDate=new Date();
      var h=NowDate.getHours();
      var m=NowDate.getMinutes();
      var s=NowDate.getSeconds();　
      var ToDay = NowDate.getFullYear()+ "年" + (NowDate.getMonth()+1) + "月" + NowDate.getDate() + "日";
      var HMS = h + "時" + m + "分" + s + "秒";
      document.getElementById('showbox').innerHTML = "<h3>上班打卡時間 :<h3/> " + HMS;
      document.getElementById("user_para").innerHTML = "<h3>使用者帳戶 :<h3/> " + email_id;

      db.collection(email_id).doc(ToDay).set({
        上班時間: HMS
      },{merge: true}).then(() => {
        console.log('set data successful');
      });
    }
    document.getElementById("Card_div").style.display = "block";
}

function PunchAfter(){
  var user = firebase.auth().currentUser;
  user.getIdToken().then(function (token) {
      console.log(token);
    });
  if(user != null){
      var email_id = user.email;
      var db = firebase.firestore();
      var NowDate=new Date();
      var h=NowDate.getHours();
      var m=NowDate.getMinutes();
      var s=NowDate.getSeconds();　
      var ToDay = NowDate.getFullYear()+ "年" + (NowDate.getMonth()+1) + "月" + NowDate.getDate() + "日";
      var HMS = h + "時" + m + "分" + s + "秒";
      document.getElementById('showbox').innerHTML = "<h3>下班打卡時間 :<h3/> " + HMS;
      document.getElementById("user_para").innerHTML = "<h3>使用者帳戶 :<h3/> " + email_id;

      db.collection(email_id).doc(ToDay).set({
        下班時間: HMS
      },{merge: true}).then(() => {
        console.log('set data successful');
      });
    }
    document.getElementById("Card_div").style.display = "block";
}

function userback(){
  document.getElementById("Card_div").style.display = "none";
  document.getElementById("user_div").style.display = "block";
}

function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function login_Signup() {console.log('sss');
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  // firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;

  //   window.alert("Error : " + errorMessage);

  //   // ...
  // });
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ...
  });

}

// FB 登入
function fb_login() {

  const provider = new firebase.auth.FacebookAuthProvider();
  // 自動偵測瀏覽器語言
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(errorMessage);
  });
}

// google 登入
function google_login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  // 自動偵測瀏覽器語言
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(errorMessage);
  });
}

// 訪客登入
function phone_login() {
  window.location.href = "phone.html";
}

function changeEmail() {
  // 自動偵測瀏覽器語言
  firebase.auth().useDeviceLanguage();
  // 修改 Email
  var user = firebase.auth().currentUser;
  user.updateEmail("andy6804tw@gmail.com").then(function () {
    // Update successful.
  }).catch(function (error) {
    // An error happened.
  });
}


function logout(){
  firebase.auth().signOut();
}
