import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { VirtualTwinsService } from '../virtual-twins.service';


@Component({
  selector: 'app-file-upload-button',
  templateUrl: "./file-upload-button.component.html",
  styleUrls: ["./file-upload-button.component.scss"]
})
export class FileUploadButtonComponent {

    fileName = '';
    @Input() destination!: string;
    @Output() uploaded = new EventEmitter();

    constructor(private virtualTwinsService: VirtualTwinsService, private http: HttpClient) {}

    onFileSelected(event: any) {

        const file:File = event.target.files[0];

        if (file) {
            this.fileName = file.name;

            const formData = new FormData();

            formData.append("file", file);

            const upload = this.http.post(this.virtualTwinsService.api_addr + this.destination, formData);
            upload.subscribe((data:any)=>{
                this.uploaded.emit('uploaded ' + this.fileName)
            });
        }
    }
}