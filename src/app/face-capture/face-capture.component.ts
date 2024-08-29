import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from '../register/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-face-capture',
  templateUrl: './face-capture.component.html',
  styleUrls: ['./face-capture.component.css']
})
export class FaceCaptureComponent implements AfterViewInit, OnInit {

  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  email: string;
  password: string;

  capturedImages: string[] = [];

  constructor(private router: Router, private http: HttpClient, private dataSharingService: DataSharingService, private serve: AuthService, private route: ActivatedRoute) {}
  

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.password = params['password'];
    });
  }

  ngAfterViewInit() {
    this.startCamera();
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.video.nativeElement.srcObject = stream;
    }).catch(err => {
      console.error("Error accessing camera: ", err);
    });
  }

  takeSnapshot() {
    if (!this.video.nativeElement || !this.canvas.nativeElement) {
      console.error("Video or canvas element is not available");
      return;
    }

      // Increase the canvas area
    const context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const dataURL = this.canvas.nativeElement.toDataURL('image/png');
    this.capturedImages.push(dataURL);

    if (this.capturedImages.length < 20) {
      console.log("Taking image capture")
      setTimeout(() => this.takeSnapshot(), 1); // Take a picture every 500ms
    } else {
      // Stop the video stream
      const stream = this.video.nativeElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      this.video.nativeElement.srcObject = null;
      // console.log("Captured images:", this.capturedImages);
      this.saveImages()
      // Send the images to the backend or handle them as needed
      // alert('Images saved successfully!'); // Display success prompt
      // this.navigateToLogin();
      // this.navigateToLogin()
    }
  }


  takeSnapshotForLoginAuthentication() {
    if (!this.video.nativeElement || !this.canvas.nativeElement) {
      console.error("Video or canvas element is not available");
      return;
    }

      // Increase the canvas area
    const context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const dataURL = this.canvas.nativeElement.toDataURL('image/png');
    this.capturedImages.push(dataURL);

    if (this.capturedImages.length < 20) {
      console.log("Taking image capture")
      setTimeout(() => this.takeSnapshotForLoginAuthentication(), 1); // Take a picture every 500ms
    } else {
      // Stop the video stream
      const stream = this.video.nativeElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      this.video.nativeElement.srcObject = null;
      this.matchImages()

 
    }
  }




saveImages() {
  const payload = {
    email: this.email,
    password: this.password,
    images: this.capturedImages.map(image => image.split(',')[1]) // Remove the data URL scheme
  };

  this.http.post('https://9fdc-69-18-37-194.ngrok-free.app/train', payload).subscribe(
    (response: any) => {
      if(response){
      alert('Images saved and registration completed successfully!'); // Display success prompt
      this.navigateToLogin();
      }
 
    },
    error => {
      console.error('Error saving images', error);
      alert('Failed to save images. Please try again.' + error); // Display error prompt
    }
  );
}

matchImages() {
  const payload = {
    images: this.capturedImages.map(image => image.split(',')[1]) // Remove the data URL scheme
  };

  this.http.post<{ confidence: number; email: string; password: string }>('https://9fdc-69-18-37-194.ngrok-free.app/match-faces', payload).subscribe(
    (response: any) => {
      // Access the email and password from the response and use them to log in
      const email = response.email;
      const password = response.password;

      console.log('Payload === ' + JSON.stringify(response));
      if(response){
        alert('Images matched successfully!' ); // Display success prompt
        this.serve.login(email, password);
      }
     
    },
    error => {
      console.error('Error matching images', error);
      alert('Failed to match images. Please try again.' + error); // Display error prompt
    }
  );
}

  

  navigateToCart() {
    this.router.navigateByUrl('/cart/checkout');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
}
