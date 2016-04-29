import { OnInit, Component } from 'angular2/core';
import { BoardService } from './board.service';
import { TileComponent } from './tile.component';
import { PieceComponent } from '../pieces/piece.component';

@Component({
    selector: 'board',
    template: `
        <div *ngFor="let row of _rows" class="row">
            <tile *ngFor="let col of row" [backgroundColor]="col.backgroundColor" [highlighted]="col.highlighted" (tileClicked)="_boardService.tileClicked(col)">
                <piece [type]="col.piece" [yours]="col.yours" [white]="col.white"></piece>
            </tile>
        </div>
    `,
    styles: [
        `tile {
            display: inline-block;
        }
        .row {
            display: flex;
            justify-content: center;
        }`
    ],
    directives: [ TileComponent, PieceComponent ],
    viewProviders: [ BoardService ],
})
export class BoardComponent implements OnInit {
    private _rows: Object[][];
    
    constructor(private _boardService: BoardService) {}
    
    ngOnInit(): void {
        this._rows = this._boardService.getRows();
    }
    
}