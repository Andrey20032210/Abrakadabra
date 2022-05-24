var app = new Vue({
    el:"#article",
    data:{
        products:[{id:1,title:"«ORO BLANKO»", short_text:'Green sweetness and juiceness',image:'/img/oroblanko_2.jpg', desc:"These small fruits surprise with their juiciness and sweetness. The light, almost white flesh of these grapefruits is hidden under a thick, rough greenish-yellow rind."},
                 {id:2,title:"«DUNKAN»", short_text:'Sweet and a little bit sour',image:'/img/dunkan.jpg', desc:"This variety is one of the oldest. It can be grown not only naturally, but also at home. The spherical fruits «DUNKAN» do not differ in their large size - their weight reaches 400 grams. The flesh of such grapefruits is juicy, whitish-yellow, and tastes sweet with sourness and bitterness."},
                 {id:3,title:"«MARSH»", short_text:'Ancient yellow-red kind',image:'/img/marsh.jpg', desc:"Another ancient variety of this plant, characterized by a smooth yellow or yellow-red skin. Inside the «MARSH» fruit there is a sweet juicy pulp with a slight bitter aftertaste and with a small amount of seeds."},
                 {id:4,title:"«PLAMYA»", short_text:'Really sweet, very red',image:'/img/plamya.jpg', desc:"Representatives of this variety have a smooth yellow skin with a red blush and are distinguished by sweet, without bitterness, pink or reddish flesh."},
                 {id:5,title:"«RUBY»", short_text:'No bones, no bitterness',image:'/img/rubin.jpg', desc:"The skin of ruby grapefruits is bright yellow or orange with reddish streaks. The fruits are large, contain no seeds, and the pulp is very sweet, pleasant to the taste, practically without bitterness."},
                 {id:6,title:"«SHAMBAR»", short_text:'Coloured like Ruby, but better at all.',image:'/img/shambar.jpg', desc:"Shambar is in the top four in terms of productivity and fruit color. Fruits are spherical or slightly flattened, the peel can be either green-yellow or yellow-orange, the flesh is yellow and sometimes pinkish pigmentation appears. Fruits are practically seedless. The pulp is very tender, juicy, excellent taste!"},],
        product:[],
        cart:[],
        contactFields:[],
        btnVisible: 0

    },
    mounted:function(){
        console.log(window.localStorage.getItem('prod'));
        this.getProduct();
        this.checkInCart();
        this.getCart();
    },
    methods:{
        addItem:function(id){
            window.localStorage.setItem('prod',id);
        },
        getProduct: function(){
            if(window.location.hash){
                var id = window.location.hash.replace('#','');
                if(this.products && this.products.length>0){
                    for(i in this.products){
                        if(this.products[i] && this.products[i].id && id==this.products[i].id) this.product=this.products[i];
                    }
                }
            }
            
        },
        addToCart:function(id){
            console.log('button = '+ this.btnVisible);
            var cart = [];
            if(window.localStorage.getItem('cart')){
                cart = window.localStorage.getItem('cart').split(',');
            }

            if(cart.indexOf(String(id))==-1){
                cart.push(id);
                window.localStorage.setItem('cart',cart.join());
                this.btnVisible=1;
                
            }
           
        },
        checkInCart:function(){
            if(this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id))!=-1) this.btnVisible=1;
        },
        getCart: function(){
            var temp = [];
            if(window.localStorage.getItem('cart')){
                temp = window.localStorage.getItem('cart').split(',');
                console.log(temp[0]);
            }
            for(j in temp){
                for(i in this.products){
                    
                    if(temp[j]==this.products[i].id){
                           this.cart.push(this.products[i]);
                           
                    }
                    console.log(i);
                }
            }
           
           console.log('cart - ' + this.cart[0]);
                   console.log('cart - ' + this.cart[1]);
        },
        removeFromCart:function(id){
            console.log('beginning of the deleting...');
            for(i in this.cart){
                if(this.cart[i].id==id){
                    this.cart.splice(i,1)
                }
            }
            var storedProd = window.localStorage.getItem('cart').split(',');
            storedProd.splice(storedProd.indexOf(String(id)),1)
            window.localStorage.setItem('cart', storedProd.join());
            console.log('Ending of the deleting... localStorage is now = ' + window.localStorage.getItem('cart'));
        },
        makeOrder:function(){
            document.getElementById("article").innerHTML = 'Your data:<p><p>Name: ' + this.contactFields.name + '<br>Company name: ' + this.contactFields.company + 
                                                            '<br>Position: ' + this.contactFields.position + '<br>City: ' + this.contactFields.city + '<br>Country: ' + this.contactFields.country + 
                                                            '<br>Telephone: ' + this.contactFields.phone + '<br>Email:' + this.contactFields.email + '<br>You are a:' + this.contactFields.profession + 
                                                            '<br>If other:' + this.contactFields.other_prof + '<br>Your interests:' + this.contactFields.interests + '<p><p>Your appeal will be processed soon!';
            window.localStorage.clear('cart');
            this.cart.splice(0, this.cart.length)
        }

    }
});