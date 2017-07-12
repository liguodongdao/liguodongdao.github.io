var templatestr = require('./labelselect.html');

//注册labelselect组件
Vue.component('labelselect',{
	template: templatestr,
	props:['labels','show','iarray'],
	computed:{
		'showModal':function(){
			if(this.show){
				return "table";
			}else{
				return "none";
			}
		}
	},
	methods:{
		//判断initarray中是否有某个值
		'getIndex':function( number ){
			for(var i=0;i<this.iarray.length;i++){
				if( this.iarray[i] == number ){
					return i;
				}
			}
			return false;
		},
		//
		'select':function(num){
			if( this.labels[num].active ){
				var index = this.getIndex(num);
				this.iarray.splice(index,1);
			}else{
				this.iarray.push(num);
			}
			this.labels[num].active = !this.labels[num].active;
			
			if(this.iarray.length>4){
				var newnum = this.iarray.shift();
				this.labels[newnum].active = false;
			}
		}
	}
});


