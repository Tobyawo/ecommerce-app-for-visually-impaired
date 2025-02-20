import { Component, OnInit, NgZone } from '@angular/core';
import { NgxKeyboardEventsService, NgxKeyboardEvent } from 'ngx-keyboard-events';
import { Router, ActivatedRoute } from '@angular/router';
import { StoryblokService } from '../storyblok.service';
import { StoreService } from '../store.service';

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {

  product: any = [];

  cartItem: any = [];

  textArr: any = [];

  constructor(private route: ActivatedRoute, private showItem: StoryblokService, private router: Router, 
              private zone: NgZone, private keyListen: NgxKeyboardEventsService, private store: StoreService) { }

  ngOnInit() {
    // TO GET DATA BY ID
    const productId = this.route.snapshot.params.id;
    this.showItem.getStory(productId, {version: 'draft'})
    .then(data => {
      console.log("received data is " + JSON.stringify(data))
      this.product = data.story.content;
      this.cartItem = data.story;
      
      // TO NERRATE PRODUCT DETAILS
      this.textArr.push(`${this.product.title} has been selected, 
                         ${this.product.summary} ...
                         It's price ${this.product.price} Dollar ... ...
                         To Buy the Product,
                         Please press "Control", and then say "Buy". ... ...
                         To go to Product page,
                         Please press "Control", and then say "Continue". ... ...`);
    });

    // ADD TO CART
    const addToCart = () => {
      this.store.cartData.push(this.cartItem);
      localStorage.setItem('products', JSON.stringify(this.cartItem))
    }

    // TEXT TO SPEECH
    const sayText = () => {
        const textSpeech = () => {
          const speaks = [{name: 'Alex', lang: 'en-US'}];
          const msg = new SpeechSynthesisUtterance();
          msg.volume = 1;
          msg.rate = 0.8;
          msg.pitch = 0.5;
          msg.text  = `${this.textArr}`;
          const voice = speaks[0];
          msg.lang = voice.lang;
          speechSynthesis.speak(msg);
        };
        setTimeout(textSpeech, 1000);
      };
    sayText();

    // FUNCTIONS TO NAVIGATE TO DIFFERENT PAGES
    const goToPro = () => {
      this.zone.run(() => this.router.navigateByUrl('/products'))
      speechSynthesis.cancel();
      recognition.stop();
      checkKeyPressed();
    }

    const goToCart = () => {
      this.zone.run(() => this.router.navigateByUrl('/cart'))
      speechSynthesis.cancel();
      recognition.stop();
      checkKeyPressed();
    }

    const playAudio = () => {
      let audio = new Audio();
      audio.src = "./assets/bleep.wav";
      audio.load();
      audio.volume = 0.1;
      audio.play();
    }
    // KEYBOARD EVENT
    let keyPressed = false;
      this.keyListen.onKeyPressed.subscribe((keyEvent: NgxKeyboardEvent) => {
        if(keyPressed === false && keyEvent.code === 17){
          speechSynthesis.cancel();
          recognition.start();
          playAudio();
          keyPressed = true;
          setTimeout(checkKeyPressed, 10000);
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
    recognition.onresult = function(event) {
        let last = event.results.length - 1;
        let command = event.results[last][0].transcript;
    
        if(command.toLowerCase() === 'continue'){     
          goToPro();
          checkKeyPressed();
        }else if(command.toLowerCase() === 'bye'){ 
          speechSynthesis.cancel(); 
          addToCart();
          goToCart();  
          checkKeyPressed();    
        }
      
    };
    recognition.onspeechend = function() {
        recognition.stop();
    };
    recognition.onerror = function(event) {
      console.log(event.error);
    }  


  }



}


