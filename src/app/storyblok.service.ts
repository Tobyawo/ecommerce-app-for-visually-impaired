import { Injectable } from '@angular/core';
import Client from 'storyblok-js-client';

@Injectable({
  providedIn: 'root'
})
export class StoryblokService {

  private sbClient = new Client({
    accessToken: 'lWJ1SBQBBo9qsPQFHmG3RQtt'
  });

  
  
   
  
  
  
  


  private products = [
    {
      id: 1099986,
      uuid: '3cd9be9d-be5d-4e33-961f-404dbdd1781f',
      name: 'Infinix smart',
      created_at: '2019-06-12T09:48:02.754Z',
      published_at: null,
      content: {
        _uid: 'b0474ec5-5131-47e9-9d81-bfcf178522c6',
        price: '250',
        title: 'Infinix smart',
        summary: 'PRODUCT DETAILS\n\n5000mAh Big Battery\n4G LTE\n8MP Selfie Camera with  Flash\n13MP Rear Camera with Dual Flash\n64GB ROM + 4GB RAM\nAndroid T Go\nFingerprint & Face Unlock',
        quantity: '1',
        component: 'post',
        thumbnail: './assets/images/infinix.jpg',
        img_source: 'Azmot Zhanisov (unsplash.com)',
        _editable: '<!--#storyblok#{"name": "post", "space": "59506", "uid": "b0474ec5-5131-47e9-9d81-bfcf178522c6", "id": "1099986"}-->'
      },
      slug: 'Infinix smart',
      full_slug: './assets/images/infinix.jpg',
      position: 10,
      is_startpage: false,
      parent_id: 989799,
      group_id: 'a10a3a9e-61ae-4b1d-bfe6-37440146cac9',
      lang: 'default'
    },
    {
      id: 1099987,
      uuid: '3cd9be9d-be5d-4e33-961f-404dbdd1781f',
      name: 'Samsung Galaxy',
      created_at: '2019-06-12T09:48:02.754Z',
      published_at: null,
      content: {
        _uid: 'b0474ec5-5131-47e9-9d81-bfcf178522c6',
        price: '549',
        title: 'Samsung Galaxy',
        summary: 'PRODUCT DETAILS\n\nMediatek Helio G99 (6nm)\nAndroid 14, One UI 6\n6.5 inches Super AMOLED Display, 90Hz\n6GB RAM + 128GB ROM\n50MP + 5MP + 2MP Rear Camera - 13MP Front Camera\n25W Fast Charging\n4G Network',
        quantity: '1',
        component: 'post',
        thumbnail: './assets/images/samsung.jpg',
        img_source: 'Azmot Zhanisov (unsplash.com)',
        _editable: '<!--#storyblok#{"name": "post", "space": "59506", "uid": "b0474ec5-5131-47e9-9d81-bfcf178522c6", "id": "1099986"}-->'
      },
      slug: 'Samsung Galaxy',
      full_slug: './assets/images/samsung.jpg',
      position: 10,
      is_startpage: false,
      parent_id: 989799,
      group_id: 'a10a3a9e-61ae-4b1d-bfe6-37440146cac9',
      lang: 'default'
    },
    {
      id: 1099988,
      uuid: '3cd9be9d-be5d-4e33-961f-404dbdd1781f',
      name: 'IPhone 15',
      created_at: '2019-06-12T09:48:02.754Z',
      published_at: null,
      content: {
        _uid: 'b0474ec5-5131-47e9-9d81-bfcf178522c6',
        price: '549',
        title: 'IPhone 15',
        summary: 'PRODUCT DETAILS\n\nMediatek Helio G99 (6nm)\nAndroid 14, One UI 6\n6.5 inches Super AMOLED Display, 90Hz\n6GB RAM + 128GB ROM\n50MP + 5MP + 2MP Rear Camera - 13MP Front Camera\n25W Fast Charging\n4G Network',
        quantity: '1',
        component: 'post',
        thumbnail: './assets/images/Iphone.jpg',
        img_source: 'Azmot Zhanisov (unsplash.com)',
        _editable: '<!--#storyblok#{"name": "post", "space": "59506", "uid": "b0474ec5-5131-47e9-9d81-bfcf178522c6", "id": "1099986"}-->'
      },
      slug: 'IPhone 15',
      full_slug: './assets/images/Iphone.jpg',
      position: 10,
      is_startpage: false,
      parent_id: 989799,
      group_id: 'a10a3a9e-61ae-4b1d-bfe6-37440146cac9',
      lang: 'default'
    },
    {
      id: 1099989,
      uuid: '3cd9be9d-be5d-4e33-961f-404dbdd1781f',
      name: 'IPhone 15',
      created_at: '2019-06-12T09:48:02.754Z',
      published_at: null,
      content: {
        _uid: 'b0474ec5-5131-47e9-9d81-bfcf178522c6',
        price: '549',
        title: 'IPhone 15',
        summary: 'PRODUCT DETAILS\n\nMediatek Helio G99 (6nm)\nAndroid 14, One UI 6\n6.5 inches Super AMOLED Display, 90Hz\n6GB RAM + 128GB ROM\n50MP + 5MP + 2MP Rear Camera - 13MP Front Camera\n25W Fast Charging\n4G Network',
        quantity: '1',
        component: 'post',
        thumbnail: './assets/images/Iphone.jpg',
        img_source: 'Azmot Zhanisov (unsplash.com)',
        _editable: '<!--#storyblok#{"name": "post", "space": "59506", "uid": "b0474ec5-5131-47e9-9d81-bfcf178522c6", "id": "1099986"}-->'
      },
      slug: 'IPhone 15',
      full_slug: './assets/images/Iphone.jpg',
      position: 10,
      is_startpage: false,
      parent_id: 989799,
      group_id: 'a10a3a9e-61ae-4b1d-bfe6-37440146cac9',
      lang: 'default'
    }
    // Add other products similarly...
  ];

  constructor() { }

  private getProducts(): Promise<any> {
    return new Promise((resolve) => {
      resolve({
        data: {
          stories: this.products
        },
        headers: {
          'cache-control': 'max-age=0, private, must-revalidate',
          'content-type': 'application/json; charset=utf-8',
          'per-page': '25',
          'total': this.products.length
        },
        perPage: 25,
        total: this.products.length
      });
    });
  }


  private getProductById(productId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        resolve({ data: { story: product } });
      } else {
        reject(`Product with ID ${productId} not found.`);
      }
    });
  }

  getStory(slug: string, params?: object): Promise<any> {
    // If the slug is '/' and starts_with is 'men/', fetch all products
    if (slug === '/' && params && params['starts_with'] === 'men/') {
      return this.getProducts().then(res => {
        // console.log("Data received: " + JSON.stringify(res));
        return res.data;
      });
    }

    // If the slug is to fetch a specific product by ID
    const productId = parseInt(slug, 10);
    if (!isNaN(productId)) {
      return this.getProductById(productId).then(res => {
        // console.log("Data received for product ID " + productId + ": " + JSON.stringify(res));
        return res.data;
      });
    }

    // // Fallback to original sbClient call for other slugs
    // return this.sbClient.getStory(slug, params)
    //   .then(res => {
    //     console.log("Data received by sbClient: " + JSON.stringify(res));
    //     return res.data;
    //   });
  }
}
