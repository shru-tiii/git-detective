
const user = document.querySelector(".searchfield");
const user_container = document.querySelector(".user-container");

function searchuser(event){ //ki enter se bhi search hojae -- eventlistener on input tag
    if(event.keyCode === 13){
    getuserdeets(user.value);
    }
}
function searchusername(){ //button se search ho
    getuserdeets(user.value);
}
async function getuserdeets(username){
    try{
        let res = await fetch(`https://api.github.com/users/${username}`);
        let data = await res.json();
        updateuserinfo(data); //dom manipulation
    }
    catch{ //if user uss naam ka na ho
        user_container.classList.remove("active");
        alert("No such user exists!");
    }
}
let mode = document.querySelector(".modename");
let loc = document.querySelector(".loc");
let tweet = document.querySelector(".tweet");
function updateuserinfo(data){
    console.log(data);
    let img = document.querySelector(".photo");
    let namee = document.querySelector(".name");
    let joindate = document.querySelector(".joined");
    let link = document.querySelector(".user-link");
    let bio = document.querySelector(".user-bio");
    let repo = document.querySelector(".repos-no");
    let follower = document.querySelector(".followers-no");
    let following = document.querySelector(".following-no");
    //loc n tweet bhi use hue h idhar 

    //set default then change accordingly
    loc.innerText = `Not Available`;
    loc.style.color = "lightgray";
    document.querySelector(".l").style.color = "lightgray";
    tweet.innerText = `Not Available`;
    tweet.style.color = "lightgray";
    document.querySelector(".t").style.color = "lightgray";

    img.src = `${data?.avatar_url}`;
    namee.innerText = `${data?.name}`;
    joindate.innerText = `Joined on: ${data?.created_at.slice(0,10)}`;
    link.innerText = `@${data?.login}`;
    link.href = `${data?.html_url}`;
    bio.innerText = `${data?.bio}`;
    repo.innerText = `${data?.public_repos}`;
    follower.innerText = `${data?.followers}`;
    following.innerText = `${data?.following}`;
    let color = "black";
    if(mode.innerText == "Light") {
        color = "white"
    }
    const location = data?.location;
    const twitter = data?.twitter_username;
    console.log(twitter);
    if(location!=null){
        loc.innerText = `${location}`;
        loc.style.color = color;
        document.querySelector(".l").style.color = color;
    }
    if(twitter!=null){
        tweet.innerText = `${twitter}`;
        tweet.style.color = color;
        document.querySelector(".t").style.color = color;
    }

    //show the container after all edits
    user_container.classList.add("active");
}

function changemode(){ //dark and light mode change
    
    let modeicon = document.querySelector(".micon");
    let body = document.querySelector("body");
    let ele = document.querySelectorAll(".container");
    let userdeets = document.querySelector(".user-deets");
    if(mode.innerText == "Dark"){ //dark theme karni h
        body.classList.add("dark");
        mode.innerText = "Light";
        modeicon.classList.remove("fa-solid","fa-moon");
        modeicon.classList.add("fa-solid","fa-sun");
        ele.forEach(function(element) {
            element.classList.add("dark");
        });
        userdeets.classList.add("dark");
        let color = "white";
        if(tweet.innerText!="Not Available"){
            tweet.style.color = color;
            document.querySelector(".t").style.color = color;
        }
        if(loc.innerText!="Not Available"){
            loc.style.color = color;
            document.querySelector(".l").style.color = color;
        }
    }
    else{ //light theme karni hai
        body.classList.remove("dark");
        mode.innerText = "Dark";
        modeicon.classList.remove("fa-solid","fa-sun");
        modeicon.classList.add("fa-solid","fa-moon");
        ele.forEach(function(element) {
            element.classList.remove("dark");
        });
        userdeets.classList.remove("dark");
        let color = "black";
        if(tweet.innerText!="Not Available"){
            tweet.style.color = color;
            document.querySelector(".t").style.color = color;
        }
        if(loc.innerText!="Not Available"){
            loc.style.color = color;
            document.querySelector(".l").style.color = color;
        }
    }

}