const EMPTY=0;
const RED=1;
const BLACK=2;
const REDKING=3;
const BLACKKING=4;

function Board(initState){
	this.cells = initState?initState:[];
	this.rows = 8;
	this.cols = 8;

	this.indexToXY = function(index){
		return {x:index%this.cols, y:Math.floor(index/this.rows)};
	}

	this.setForCheckers = function(){
		this.cells = [
			2, 0, 2, 0, 2, 0, 2, 0,
			0, 2, 0, 2, 0, 2, 0, 2,
			2, 0, 2, 0, 2, 0, 2, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 1, 0, 1, 0, 1, 0, 1,
			1, 0, 1, 0, 1, 0, 1, 0,
			0, 1, 0, 1, 0, 1, 0, 1,
		]
	}

	this.getLegalNextStates = function(color){
		
		let nextBoard = this.cells.slice();
		let nextBoards = [];
		let enemy = color===RED ? BLACK : RED;

		this.cells.forEach((state, index)=>{
			let loc = this.indexToXY(index);
			if(state!=color && state!=color+2){return;}
			//Get jumps 
			if(color===RED || color===BLACK && state===BLACKKING){
				//Check NW
				if(loc.y>1 && loc.x>1 && this.cells[index-2*this.cols-2]===EMPTY && (this.cells[index-this.cols-1]===enemy || this.cells[index-this.cols-1]===enemy+2)){
					nextBoard = this.cells.slice();
					nextBoard[index-2*this.cols-2]=state;
					if(loc.y===2 && state===RED){
						nextBoard[index-2*this.cols-2]=REDKING;
					}
					nextBoard[index-this.cols-1]=EMPTY;
					nextBoard[index]=EMPTY;
					nextBoards.push(new Board(nextBoard));
				}
				//Check NE
				if(loc.y>1 && loc.x<this.cols-2 && this.cells[index-2*this.cols+2]===EMPTY && (this.cells[index-this.cols+1]===enemy || this.cells[index-this.cols+1]===enemy+2)){
					nextBoard = this.cells.slice();
					nextBoard[index-2*this.cols+2]=state;
					if(loc.y===2 && state===RED){
						nextBoard[index-2*this.cols+2]=REDKING;
					}
					nextBoard[index-this.cols+1]=EMPTY;
					nextBoard[index]=EMPTY;
					nextBoards.push(new Board(nextBoard));
				}
			}
			if(color===BLACK || color===RED && state===REDKING){
				//Check SW
				if(loc.y < this.rows-2 && loc.x>1 && this.cells[index+2*this.cols-2]===EMPTY && (this.cells[index+this.cols-1]===enemy || this.cells[index+this.cols-1]===enemy+2)){
					nextBoard = this.cells.slice();
					nextBoard[index+2*this.cols-2]=state;
					if(loc.y===this.rows-3 && state===BLACK){
						nextBoard[index+2*this.cols-2]=BLACKKING;
					}
					nextBoard[index+this.cols-1]=EMPTY;
					nextBoard[index]=EMPTY;
					nextBoards.push(new Board(nextBoard));
				}
				//Check SE
				if(loc.y < this.rows-2 && loc.x<this.cols-2 && this.cells[index+2*this.cols+2]===EMPTY && (this.cells[index+this.cols+1]===enemy || this.cells[index+this.cols+1]===enemy+2)){
					nextBoard = this.cells.slice();
					nextBoard[index+2*this.cols+2]=state;
					if(loc.y===this.rows-3 && state===BLACK){
						nextBoard[index+2*this.cols+2]=BLACKKING;
					}
					nextBoard[index+this.cols+1]=EMPTY;
					nextBoard[index]=EMPTY;
					nextBoards.push(new Board(nextBoard));
				}
			}
				
			
		});
		if(!nextBoards.length){
			this.cells.forEach((state, index)=>{
				let loc = this.indexToXY(index);
				if(state!=color && state!=color+2){return;}
				//Get moves to empty spaces
				if(color===RED || color===BLACK && state===BLACKKING){
					//Check NW
					if(loc.y >0 && loc.x>0 && this.cells[index-this.cols-1]===EMPTY){
						nextBoard = this.cells.slice();
						nextBoard[index-this.cols-1]=state;
						if(loc.y===1 && state===RED){
							nextBoard[index-this.cols-1]=REDKING;
						}
						nextBoard[index]=EMPTY;
						nextBoards.push(new Board(nextBoard));
					}
					//Check NE
					if(loc.y>0 && loc.x<this.cols-1 && this.cells[index-this.cols+1]===EMPTY){
						nextBoard = this.cells.slice();
						nextBoard[index-this.cols+1]=state;
						if(loc.y===1 && state===RED){
							nextBoard[index-this.cols+1]=REDKING;
						}
						nextBoard[index]=EMPTY;
						nextBoards.push(new Board(nextBoard));
					}
				}
				if(color===BLACK || color===RED && state===REDKING){
					//Check SW
					if(loc.y < this.rows-1 && loc.x>0 && this.cells[index+this.cols-1]===EMPTY){
						nextBoard = this.cells.slice();
						nextBoard[index+this.cols-1]=state;
						if(loc.y===this.rows-2 && state===BLACK){
							nextBoard[index+this.cols-1]=BLACKKING;
						}
						nextBoard[index]=EMPTY;
						nextBoards.push(new Board(nextBoard));
					}
					//Check SE
					if(loc.y < this.rows-1 && loc.x<this.cols-1 && this.cells[index+this.cols+1]===EMPTY){
						nextBoard = this.cells.slice();
						nextBoard[index+this.cols+1]=state;
						if(loc.y===this.rows-2 && state===BLACK){
							nextBoard[index+this.cols+1]=BLACKKING;
						}
						nextBoard[index]=EMPTY;
						nextBoards.push(new Board(nextBoard));
					}
				}
					
				
			});
		}

		return shuffle(nextBoards);
		//Get jumps for normal pieces 
		//Get jumps for kings 
	}

	this.toTable = function(){
		let html='<table>';
		const states = [
			'<div class="checker">&nbsp;</div>',
			'<div class="checker red">●</div>',
			'<div class="checker black">●</div>',
			'<div class="checker red">K</div>',
			'<div class="checker black">K</div>',
		]
		let state = '';
		for(let y=0;y<this.rows;y++){
			html+="<tr>";
			for(let x=0;x<this.cols;x++){
				state=states[this.cells[x+y*this.cols]];
				color = ((x+y)%2) ? 'light' : 'dark';
				html+=`<td class='${color}'>${state}</td>`;
			}
			html+="</tr>";
		}
		html+="</table>";
		return html;
	}
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

