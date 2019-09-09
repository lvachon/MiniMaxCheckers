const EMPTY=0;
const RED=1;
const BLACK=2;
const REDKING=3;
const BLACKKING=4;

function Board(initState){
	this.cells = [];
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
		console.log(this.cells);

		this.cells.forEach((state, index)=>{
			let loc = this.indexToXY(index);
			if(state!=color && state!=color+2){return;}
			//Get moves to empty spaces for normal pieces
			if(color===RED || color===BLACK && state===BLACKKING){
				//Check NW
				if(loc.y >0 && loc.x>0 && this.cells[index-this.cols-1]===EMPTY){
					nextBoard = this.cells.slice();
					nextBoard[index-this.cols-1]=state;
					nextBoard[index]=EMPTY;
					nextBoards.push(nextBoard);
				}
				//Check NE
				if(loc.y>0 && loc.x<this.cols-1 && this.cells[index-this.cols+1]===EMPTY){
					nextBoard = this.cells.slice();
					nextBoard[index-this.cols+1]=state;
					nextBoard[index]=EMPTY;
					nextBoards.push(nextBoard);
				}
			}
			if(color===BLACK || color===RED && state===REDKING){
				//Check SW
				if(loc.y < this.rows-1 && loc.x>0 && this.cells[index+this.cols-1]===EMPTY){
					nextBoard = this.cells.slice();
					nextBoard[index+this.cols-1]=state;
					nextBoard[index]=EMPTY;
					nextBoards.push(nextBoard);
				}
				//Check SE
				if(loc.y < this.rows-1 && loc.x<this.cols-1 && this.cells[index+this.cols+1]===EMPTY){
					nextBoard = this.cells.slice();
					nextBoard[index+this.cols+1]=state;
					nextBoard[index]=EMPTY;
					nextBoards.push(nextBoard);
				}
			}
				
			
		});

		this.cells.forEach((state, index)=>{
			let loc = this.indexToXY(index);
			if(state!=color && state!=color+2){return;}
			//Get moves to empty spaces for normal pieces
			if(color===RED || color===BLACK && state===BLACKKING){
				//Check NW
				if(loc.y>1 && loc.x>1 && this.cells[index-2*this.cols-2]===EMPTY && (this.cells[index-this.cols-1]===enemy || this.cells[index-this.cols-1]===enemy+2)){
					nextBoard = this.cells.slice();
					nextBoard[index-2*this.cols-2]=state;
					nextBoard[index-this.cols-1]=EMPTY;
					nextBoard[index]=EMPTY;
					nextBoards.push(nextBoard);
				}
				//Check NE
				if(loc.y>1 && loc.x<this.cols-2 && this.cells[index-2*this.cols+2]===EMPTY && (this.cells[index-this.cols+1]===enemy || this.cells[index-this.cols+1]===enemy+2)){
					nextBoard = this.cells.slice();
					nextBoard[index-2*this.cols+2]=state;
					nextBoard[index-this.cols+1]=EMPTY;
					nextBoard[index]=EMPTY;
					nextBoards.push(nextBoard);
				}
			}
			if(color===BLACK || color===RED && state===REDKING){
				//Check SW
				if(loc.y < this.rows-2 && loc.x>1 && this.cells[index+2*this.cols-2]===EMPTY && (this.cells[index+this.cols-1]===enemy || this.cells[index+this.cols-1]===enemy+2)){
					nextBoard = this.cells.slice();
					nextBoard[index+2*this.cols-2]=state;
					nextBoard[index+this.cols-1]=EMPTY;
					nextBoard[index]=EMPTY;
					nextBoards.push(nextBoard);
				}
				//Check SE
				if(loc.y < this.rows-2 && loc.x<this.cols-2 && this.cells[index+2*this.cols+2]===EMPTY && (this.cells[index+this.cols+1]===enemy || this.cells[index+this.cols+1]===enemy+2)){
					nextBoard = this.cells.slice();
					nextBoard[index+2*this.cols+2]=state;
					nextBoard[index+this.cols+1]=EMPTY;
					nextBoard[index]=EMPTY;
					nextBoards.push(nextBoard);
				}
			}
				
			
		});
		return nextBoards;
		//Get jumps for normal pieces 
		//Get jumps for kings 
	}

	this.toTable = function(board){
		let html='<table>';
		const states = [
			'<div class="checker">&nbsp;</div>',
			'<div class="checker red">o</div>',
			'<div class="checker black">o</div>',
			'<div class="checker red">k</div>',
			'<div class="checker black">k</div>',
		]
		for(let y=0;y<this.rows;y++){
			html+="<tr>";
			for(let x=0;x<this.cols;x++){
				state=states[board[x+y*this.cols]];
				color = ((x+y)%2) ? 'light' : 'dark';
				html+=`<td class='${color}'>${state}</td>`;
			}
			html+="</tr>";
		}
		html+="</table>";
		return html;
	}
}



