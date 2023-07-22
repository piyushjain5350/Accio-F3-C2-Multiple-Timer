const timers = [];

    // Add Event
    document.getElementById("input-set-time").addEventListener("click", startTimer);

    //new timer object
    function createTimer(hours, minutes, seconds) {
        const totalSeconds = hours *60*60 + minutes * 60 + seconds;
        const timer = {
            initialTime: totalSeconds,
            timeRemaining: totalSeconds,
            intervalId: null,
        };
        return timer;
    }

    //update the display of active timers
    function updateTimersDisplay() {
        const activeTimersDiv = document.getElementsByClassName("display-container")[0];
        activeTimersDiv.innerHTML = "";

        timers.forEach((timer, index) => {

            const timerDisplay = document.createElement("div");
            timerDisplay.classList.add("time-display-container");
            let obj= formatTime(timer.timeRemaining);
            timerDisplay.innerHTML=`
            <p>Time left:</p>
            <div class="time-container">
                <div class="hour">${obj.hour}</div>:
                <div class="minute">${obj.minute}</div>:
                <div class="second">${obj.second}</div>
            </div>
            `;

            const stopButton = document.createElement("button");
            stopButton.textContent = "Delete";
            stopButton.setAttribute("data-index", index);
            stopButton.id="delete-btn";

            stopButton.addEventListener("click", stopTimer);

            timerDisplay.appendChild(stopButton);
            activeTimersDiv.appendChild(timerDisplay);
            
        });
    }

    // Function to start a new timer
    function startTimer() {
        const hoursInput = document.getElementById("input-time-hour");
        const minutesInput = document.getElementById("input-time-minute");
        const secondsInput = document.getElementById("input-time-second");

        const form=document.getElementById("form-input");

        const hours = parseInt(hoursInput.value)||0;
        const minutes = parseInt(minutesInput.value)||0;
        const seconds = parseInt(secondsInput.value)||0;

        if (hours<0 && hours>=24 && minutes<0 && minutes>=60 && seconds<0 &&seconds>=60) {
            alert("Please enter a valid time.");
            form.reset();
            // return;
        }else{
            const newTimer = createTimer(hours, minutes, seconds);
            timers.push(newTimer);

            if (!newTimer.intervalId) {
                newTimer.intervalId = setInterval(() => {
                    newTimer.timeRemaining--;   
                    if (newTimer.timeRemaining <= 0) {
                        clearInterval(newTimer.intervalId);
                        newTimer.intervalId = null;
                        playAudioAlert();
                    }
                    updateTimersDisplay();
                }, 1000);
            }

            updateTimersDisplay();
        }
    }

    // Function to stop a timer
    function stopTimer(event) {
        const index = event.target.getAttribute("data-index");
        const timer = timers[index];
        clearInterval(timer.intervalId);
        timer.intervalId = null;
        timers.splice(index, 1);
        updateTimersDisplay();
    }

    // Function to play the audio alert
    function playAudioAlert() {
        const audio = document.getElementById("alarm-sound");
        audio.play();
    }

    // Function to format time in HH:MM:SS format
    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        let tempObj={
            hour:hours,
            minute:minutes,
            second:seconds
        }
        return tempObj;
    }

    // const setTimeBtn=document.getElementById("input-set-time");
    // const timers=[];

    // setTimeBtn.addEventListener("click",()=>{
    //     const hoursInput=document.getElementById("input-time-hour");
    //     const minutesInput=document.getElementById("input-time-minute");
    //     const secondsInput=document.getElementById("input-time-second"); 


    //     const hour = parseInt(hoursInput.value);
    //     const minute = parseInt(minutesInput.value);
    //     const second = parseInt(secondsInput.value);

    //     const form=document.getElementById("form-input");

    //     if(hour>=0&&hour<=24 && minute>=0&&minute<=60 && second>=0&&second<=60){

    //         addTimer(hour,minute,second);
    //     }else{
    //         alert("Please, Enter the valid format!!!");
    //     }
    //     form.reset();
    // });

    // function addTimer(hour , minute , second){
    //     document.getElementById("display-no-time").style.display="none";
    //     const addContainer=document.getElementsByClassName("display-container")[0];

    //     var total=hour*60*60+minute*60+second;
    //     console.log("total::::-->"+total +" "+hour*60*60+" "+minute*60+" "+second);

    //     const div=document.createElement("div");
    //     div.classList.add("time-display-container");
    //     div.innerHTML=`
    //             <p>Time left:</p>
    //             <div class="time-container">
    //                 <div class="hour">${hour}</div>:
    //                 <div class="minute">${minute}</div>:
    //                 <div class="second">${second}</div>
    //             </div>
    //             <input type="button" value="delete" id="delete-btn">
    //     `
    //     addContainer.appendChild(div);
    // }

