import {Component} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'cgu-content',
    templateUrl: './cgu.component.html',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule],
})
export class CguContent {
    constructor(public dialog: MatDialog) {
    }

    openDialog() {
        const dialogRef = this.dialog.open(CguContentDialog);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
}

@Component({
    selector: 'cgu-content-dialog',
    templateUrl: './cgu-content-dialog.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
})
export class CguContentDialog {
}
