import { Component, OnInit, NgZone, ViewChild, ElementRef} from '@angular/core';
import { NgxKeyboardEventsService, NgxKeyboardEvent } from 'ngx-keyboard-events';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataSharingService } from './data-sharing.service';


export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  email: string;
  password: string;
  invalidForm: boolean;
  showCamera: boolean = false;
  capturedImages: string[] = [];


  
  constructor(private fAuth: AngularFireAuth, public router: Router,
              private zone: NgZone, private keyListen: NgxKeyboardEventsService, private http: HttpClient,private dataSharingService: DataSharingService) { }

  ngOnInit() {
    document.getElementById("email").focus();
    document.getElementById("pass-input").style.display = "none";
      // LOG IN PAGE VOICE TEXT
      const logText = () => {
        const msg = new SpeechSynthesisUtterance();    
        msg.rate = 0.8;
        msg.pitch = 0.5;  
        msg.text =  `You are in Register page. ...
                    If you are already registered. ..., 
                    Please Sign In with your email and Password. ...
                    To get the "Sign In" form. ...
                    Plese press "Control" and say "Sign In". ...`
        speechSynthesis.speak(msg)
        const emailText = () => {
          const msg = new SpeechSynthesisUtterance();    
          msg.text = `To Register. ...
                      Please write your email address and press "Enter" . ...`
          speechSynthesis.speak(msg)
        }
        setTimeout(emailText, 3000);
    
      }
      setTimeout(logText, 1000);
  
      
      // VOICE TEXT TO FILL PASSWORD
      const passText = () => {
        const msg = new SpeechSynthesisUtterance();    
        msg.text = `Password should be atleast 6 characters. ...
                    Please write correct passord. ...`
        speechSynthesis.speak(msg)
      }

      const facialText = () => {
        const msg = new SpeechSynthesisUtterance();    
        msg.text = `If you want facial authentication, then Press "Control" and say "capture" 
                    if not then Press "Control" and say "Send". ...`
        speechSynthesis.speak(msg)
      }

      const voiceText = () => {
        const msg = new SpeechSynthesisUtterance();    
        msg.text = `If you want voice authentication, then Press "Control" and say "voice" 
                    if not then Press "Control" and say "Send". ...`
        speechSynthesis.speak(msg)
      }
   
      // TO NAVIGATE TO LOG IN PAGE
      const goLogin = () => {
        this.zone.run(() => this.router.navigateByUrl('/login'))
        speechSynthesis.cancel();
      }

      const playAudio = () => {
        let audio = new Audio();
        audio.src = "./assets/bleep.wav";
        audio.load();
        audio.volume = 0.1;
        audio.play();
      }
  
      // TO ACTIVE KEY CONTROL
      let keyPressed = false;
      this.keyListen.onKeyPressed.subscribe((keyEvent: NgxKeyboardEvent) => {
        if(keyEvent.code === 13){       
          document.getElementById("pass-input").style.display = "block";
          document.getElementById("password").focus(); 
          passText(); 
          facialText();    
          voiceText();
        }else if(keyEvent.code === 17) {
          recognition.start();
          playAudio();
          keyPressed = true;
          setTimeout(checkKeyPressed, 10000);
        }else if(keyEvent.code === 18){
          recognition.stop();
        }
      });

      function checkKeyPressed(){
        return keyPressed = false;
      }      
  
      // SPEECH TO TEXT
      const {webkitSpeechRecognition} : IWindow = <IWindow>window;
      const recognition = new webkitSpeechRecognition();
      var SpeechGrammarList = SpeechGrammarList ||window['webkitSpeechGrammarList'];
  
      var grammar = '#JSGF V1.0;'
      var speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event: any) => {
          let last = event.results.length - 1;
          let command = event.results[last][0].transcript;
          console.log(command);
          if(command.toLowerCase() === 'sign in' || command.startsWith('sign in')){
            goLogin();
          }else if(command.toLowerCase() === 'send' || command.startsWith('send')){
            this.register();
          }
          else if(command.toLowerCase() === 'capture' || command.startsWith('capture')){
            this.register();
            this.captureFace();
           
          }
          else if(command.toLowerCase() === 'voice' || command.startsWith('voice')){
            this.register();
            this.captureVoice();
        
           
          }
      };
      recognition.onspeechend = () => {
          recognition.stop();
      };
      recognition.onerror = (event: any) => {
        console.log(event.error);
      }
  }


  // FUNCTION TO CAPTURE FACE 
  captureVoice() {
    console.log("Voice captured")
    // this.fAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
    // .then(value => {
    //   this.zone.run(() => this.router.navigateByUrl('/cart/checkout'))
    //   // this.router.navigate(['/cart/checkout']);
    // })
    // .catch(err => {
    //   this.invalidForm = true;
    // });
  }

  
  // FUNCTION TO CAPTURE FACE 
  // captureFace2() {
    // console.log("face captured")
    // this.captureFace()
    // this.fAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
    // .then(value => {
    //   this.zone.run(() => this.router.navigateByUrl('/cart/checkout'))
    //   // this.router.navigate(['/cart/checkout']);
    // })
    // .catch(err => {
    //   this.invalidForm = true;
    // });
  // }


  captureFace() {
    this.register();
    // this.dataSharingService.setEmail(this.email);
    // this.dataSharingService.setPassword(this.password);
    // this.zone.run(() => this.router.navigateByUrl('/face-capture'));

    this.zone.run(() => this.router.navigate(['/face-capture'], { 
      queryParams: { 
        email: this.email, 
        password: this.password 
      } 
    }));
  }

  // captureFace() {

  //   if (!this.video || !this.video.nativeElement) {
  //     console.error("Video element is not available");
  //     return;
  //   }
  //   console.log("face captured")
  //   this.showCamera = true;
  //   navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  //     this.video.nativeElement.srcObject = stream;
  //   }).catch(err => {
  //     console.error("Error accessing camera: ", err);
  //   });
  // }


  // takeSnapshot() {

  //   if (!this.video.nativeElement || !this.canvas.nativeElement) {
  //     console.error("Video or canvas element is not available");
  //     return;
  //   }

  //   const context = this.canvas.nativeElement.getContext('2d');
  //   context.drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  //   const dataURL = this.canvas.nativeElement.toDataURL('image/png');
  //   this.capturedImages.push(dataURL);

  //   if (this.capturedImages.length < 10) {
  //     setTimeout(() => this.takeSnapshot(), 500); // Take a picture every 500ms
  //   } else {
  //     // Stop the video stream
  //     const stream = this.video.nativeElement.srcObject;
  //     const tracks = stream.getTracks();
  //     tracks.forEach(track => track.stop());
  //     this.video.nativeElement.srcObject = null;
  
  //   // Send the images to the backend
  //     this.saveImages();
  //   }
  // }

  // saveImages() {
  //   const payload = {
  //     email: this.email,
  //     images: this.capturedImages
     
  //   };
  //   this.http.post('/api/save-images', payload).subscribe(response => {
  //     console.log('Images saved successfully');
  //     console.log("Sending to url...")
  //     console.log("Image one is " + this.capturedImages)
    
  //   }, error => {
  //     console.error('Error saving images', error);
  //   });
  // }


  
  // FUNCTION TO REGISTER
  register() {
    console.log("Register called")
    this.fAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(value => {
      console.log("go back to checkout")
      // this.router.navigate(['/cart/checkout']);
    })
    .catch(err => {
      this.invalidForm = true;
    });
  }


}
