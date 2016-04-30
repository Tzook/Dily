import { OnInit, Component } from 'angular2/core';
import { BoardService } from './board.service';
import { BoardInitialService } from './board-initial.service';
import { BoardUiService } from './board-ui.service';
import { TileComponent } from './tile.component';
import { PieceComponent } from '../pieces/piece.component';

@Component({
    selector: 'board',
    template: `
        <div *ngFor="let row of _rows" class="row">
            <tile *ngFor="let col of row" class="col" [highlighted]="col.highlighted" (tileClicked)="_boardService.tileClicked(col)">
                <piece [type]="col.piece" [yours]="col.yours" [white]="col.white"></piece>
            </tile>
        </div>
    `,
    styles: [
        `.col {
            display: inline-block;
        }
        .row {
            display: flex;
            justify-content: center;
        }
        .row:nth-child(even) .col:nth-child(odd),
        .row:nth-child(odd) .col:nth-child(even) {
            background: gray;
        }`
    ],
    directives: [ TileComponent, PieceComponent ],
    viewProviders: [ BoardService ],
    providers: [ BoardInitialService, BoardUiService ]
})
export class BoardComponent implements OnInit {
    private _rows: Object[][];
    
    constructor(private _boardService: BoardService) {}
    
    ngOnInit(): void {
        this._rows = this._boardService.createGame();
    }
    
}