firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
   

    var user = firebase.auth().currentUser;
    // Get idToken
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
      
      document.getElementById("user_para").innerHTML = "&nbsp日期 : " + ToDay;
      
      var ref = db.collection(email_id).doc(ToDay);

      ref.onSnapshot(doc => {
      console.log(JSON.stringify(doc.data(),null,4).replace(/\"|"/g,'').replace(/\{|}/g,'').replace(",",''));
      document.getElementById("Record").innerHTML = "<pre>" + JSON.stringify(doc.data(),null,1).replace(/\"|"/g,'').replace(/\{|}/g,'').replace(",",'') + "<pre>";
      });

      
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});


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