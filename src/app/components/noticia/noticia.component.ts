import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatalocalService } from 'src/app/services/datalocal.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() index: Number;
  @Input() enFavoritos:Boolean;
  
  constructor(private inAppBrowser: InAppBrowser, private actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing, private dataLocal: DatalocalService) { 
    this.enFavoritos;
  }

  ngOnInit() {}

  goToNoti(){
    console.log(this.noticia.url);
    const browser = this.inAppBrowser.create(this.noticia.url, '_system')
  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if( this.enFavoritos){
      guardarBorrarBtn = {
        text: 'Eliminar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar favorito');
          this.dataLocal.borrarNoticia(this.noticia);
        }
      }
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Play clicked');
          this.dataLocal.guardarNoticia(this.noticia);
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, 
        guardarBorrarBtn,
      {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  
  }

}
