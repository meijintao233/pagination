$(function () {
    //pagination plugin
    /**
     * 总页码 total
     * 
     * 默认当前页数 defaultCurrent
     * 
     * 当前页数 current
     * 
     * 每页条数 pageSize
     * 
     * 每页显示多少条 pageSizeOptions
     * 
     * 是否快速跳转 canQuickJumper
     * 
     * 总共有多少条数据 showTotal
     * 
     * 
     * 
     */

    (function($,window,document){

        let Pager = function(el,option){
            //默认参数
            const defaultOption = {
                total: 10,
                current: 1,
                pageSize: 10,
                showTotal: 20,
            };
            
            

            //合并参数
            const opts = Object.assign({},defaultOption,option);
            
            //将参数赋值在pager中
            this.opts = opts;
            this.$el = el;
            
            //初始化page
            this.init();
        };

        Pager.prototype = {
            //初始化
            init(){

                this.renderHtml();

               

                this.handle();
            },
            
            //渲染页码
            renderHtml(){
                let html = '';
                const len = this.opts.total<=10? this.opts.total : 10;
                //总数小于10不需要添加省略号
                
                for(let i=0;i < len;i++){
                    html += `<a href="#${i+1}" page="${i+1}">${i+1}</a>`;
                }
                

                this.$el.append(`<div class="list"><a href="#" class="prev"><</a>${html}<a href="#" class="next">></a></div>`);
            },

            bindEvent(event,cb){
                this.$el.on(event,cb);
            },

            handle(){

                let recIndex = 1;//记录先前的位置
                
                $(this.$el.find('a')[recIndex]).addClass('active');

                this.bindEvent('click',(e)=>{    
                    
                    const $target = $(e.target);
                    let index = $target.index('a');
                    const total = this.opts.total;
          
                    if(index>0&&index<11){
                       
                        $(this.$el.find('a')[recIndex]).removeClass('active');
                        recIndex = index;

                        if(recIndex==10){//向后
                            recIndex = this.backward(recIndex);           
                        }else if(recIndex==1){//向前
                            recIndex = this.forward(recIndex);
                        }
                        $(this.$el.find('a')[recIndex]).addClass('active');

                    }else if(index==11&&$(this.$el.find('a')[recIndex]).attr('page')<total){//向后
    
                        recIndex = this.backward(recIndex);           
                            
                    }else if(index==0&&$(this.$el.find('a')[recIndex]).attr('page')>1){//向前
                        recIndex = this.forward(recIndex); 
                    }
                })
            },

            forward(recIndex){
                $(this.$el.find('a')[recIndex]).removeClass('active');

                if(recIndex==1||--recIndex==1){
                    
                    let num 
                    if($(this.$el.find('a')[recIndex]).attr('page')<=10){//判断是否有足够的页数
                        //确定显示的页数
                        num = 1;
                        //记录下当前的位置
                        recIndex = $(this.$el.find('a')[recIndex]).attr('page');
                    }else{//有足够的页数
                        
                        num = +$(this.$el.find('a')[recIndex]).attr('page') - 1;
                        num -= 9;
                        //选中第一个元素
                        recIndex = 10;
                    }
                    
                    for (let i = 1; i < 11; i++) {
                        
                        $(this.$el.find('a')[i]).attr('page',num);
                        $(this.$el.find('a')[i]).text(num++);
                    }
                    
                }

                $(this.$el.find('a')[recIndex]).addClass('active');
                return recIndex;
            },
            
            backward(recIndex){
                $(this.$el.find('a')[recIndex]).removeClass('active');

                if(recIndex==10||++recIndex==10){//判断是否到达刷新页码的边界
                    
                    let num; 
                    if(this.opts.total-$(this.$el.find('a')[recIndex]).attr('page')<10){//判断是否有足够的页数
                        //确定显示的页数
                        num = this.opts.total - 10 + 1;
                        //记录下当前的位置
                        recIndex = 10-(this.opts.total-$(this.$el.find('a')[recIndex]).attr('page'));
                    }else{//有足够的页数
                        
                        num = +$(this.$el.find('a')[recIndex]).attr('page');
                        //选中第一个元素
                        recIndex = 1;
                    }

                    //修改页码
                    for (let i = 1; i < 11; i++) {
                        $(this.$el.find('a')[i]).attr('page',num);
                        $(this.$el.find('a')[i]).text(num++);
                    }
                    
                }
                
                $(this.$el.find('a')[recIndex]).addClass('active');

                return recIndex;
            },
        };


        $.fn.pagination = function(option){
            new Pager($(this),option);
        };
        
        $('.pager').pagination({
            total: 25,
        })
    })(jQuery,window,document);



});