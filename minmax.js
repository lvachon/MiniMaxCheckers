function MinMaxPlayer(color){
	this.color = color;
	this.pieceWeight=1;
	this.kingWeight=2;
	this.searchDepth=5;
	this.stalemateWeight=1000;
	this.rootNode=null;
	this.heuristic = function(board){
		//Def heuristic of #my pieces vs #op pieces
		return board.cells.reduce((acc,state)=>{
			if(state===this.color){
				return acc+this.pieceWeight;
			}
			if(state===this.color+2){
				return acc+this.kingWeight;
			}
			if(state>2){
				return acc-this.kingWeight;
			}
			if(state===0){return acc;}
			return acc-this.pieceWeight;
		},0);
	}
	this.pickNextMove = function(board){
		this.rootNode = new Node(board, this, 0);
		return this.rootNode.pickedBoard;
	}
}

function Node(board, player, depth){
	this.board = board;
	this.player = player;
	this.depth = depth;
	this.color = player.color+0;
	if(depth%2){
		if(this.color===1){this.color=2;}else{this.color=1;}
	}
	this.children = [];
	
	
	if(this.depth<player.searchDepth){
		this.board.getLegalNextStates(this.color).forEach(board=>{
			this.children.push(new Node(board,this.player,this.depth+1));
		});
	}

	if(this.children.length){
		let result = this.children.reduce((acc,node)=>{
			if(depth%2){
				if(node.value<acc.value){return {value:node.value,board:node.board};}	
			}else{
				if(node.value>acc.value){return {value:node.value,board:node.board};}	
			}
			return acc;
		});
		this.value = result.value;
		this.pickedBoard = result.board;
	}else{
		this.value = this.player.heuristic(this.board);
		//console.log(this.value);
		if(this.board.getLegalNextStates(this.color).length==0 && this.color===this.player.color){
			this.value=-1*this.player.stalemateWeight;//(no moves when it's my turn is stalemate (loss) or I have no pieces)
			console.log(`${this.value} ${this.player.stalemateWeight} LOSE`);
		}
		if(this.board.getLegalNextStates(this.color).length==0 && this.color!==this.player.color){
			this.value=this.player.stalemateWeight;////(no moves when it's their turn is stalemate (win) or I have they pieces)
			console.log(`${this.value} ${this.player.stalemateWeight} WIN`);
		}
		this.pickedBoard = this.board;
	}
	
	

}