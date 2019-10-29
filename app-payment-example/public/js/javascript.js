

class App {

    constructor(numCard, phone, summ, ccNum, ccYear, ccMonth, ccCvv, holderHame) {

        this.numCard = '';
        this.phone = '';
        this.summ = '';
        this.ccNum = '';
        this.ccYear = '';
        this.ccMonth = '';
        this.ccCvv = '';
        this.holderHame ='';
   }
    

   getView(templateName) {
    let self = this;
    $.ajax({
        url : '/get_templates/html/' + templateName,
        // /get_templates/html/view1.html
        success: function(d) {
           // console.log(this);
            
            if (templateName == "view1.html"){
                
                self.showPage1(d);
            }    
            if (templateName == "view2.html"){
                
                self.showPage2(d);
            }
        }
    });

}





    showPage1(d) {
                let getView = this.getView;
                let start = this.start;
                $("#main").html(d);
                 
                
                


                $.ajax({
                    url : '/get_packets',
                    success: function(p){
                        
                        for (let i = 0; i< p.packets.length; i++){
                            
                            $('.hr').append("<li "+ "id='"+p.packets[i]+"'>"+p.packets[i] +"</li>"); 
                            $("#tel").mask("+380(99) 999-99-99");
                        }
                        $(".hr").click(function(ev){
                            let id = +ev.target.id;
                            let cur = $("#sum").val();
                            $("#sum").val(+cur+id);
                            
                            $("#sum").css("background-color", "white");
                          

                        })
                        

                    }



                });

                $("#tel").keydown(function(){
                    $("#tel").css("background-color", "white");
                });
                $("#sum").keydown(function(ev){
                    console.log(ev.which);
                    let k = ev.which;
                    if (ev.which != 8 && ev.which != 0 && ev.which != 46 && (ev.which < 48 || ev.which > 57)) {
                        return false;
                        }
                        $("#sum").css("background-color", "white");
                })
                    
                $("#sub1").click(function(){
                    
                    let check = true;
                    if ($("#tel").val().search(/^\+380\(\d\d\)\s\d\d\d\-\d\d\-\d\d$/) == -1 ){
                    $("#tel").css("background-color","red");
                    console.log("incorrect");
                    check = false;
                    }
                     if($("#sum").val().search(/\d/) == -1 || +$("#sum").val() < 1){
                        $("#sum").css("background-color","red");
                        console.log("incorrect");
                        check = false;
                    }
                     if(check == true){
                    console.log("good enough");
                    this.phone = $("#tel").val();
                    this.summ = $("#sum").val();
                    console.log(phone);
                    
                    app.getView('view2.html');
                    
                    
                    }
               })
         

   }
   showPage2(d){
        $("#main").html(d);   
        console.log(d);
        $("#cc").mask("9999-9999-9999-9999", {placeholder: "X"});
        $("#month").mask("99", {placeholder: "X"});
        $("#year").mask("99", {placeholder: "X"});
        $("#cvv").mask("999", {placeholder: "X"});
        $("#cc, #month, #year, #cvv, #name").keydown(function(){
            $(this).css("background-color", "white");
            
        })
        $("#pay").click(function(){
            let check = true;
            let  valOfCc= $("#cc").val();
            let xo = valOfCc.replace(/-/g,"").split("");
            let i = 0;
            let checkLuna = 0;
            while (i<16){
                
                if(i % 2 == 0){
                    xo[i] = +xo[i] * 2;

                    if(xo[i] > 9){
                        xo[i] -= 9;
                    }
                }else {
                    xo[i] = +xo[i];
                }
                checkLuna += xo[i];
                i ++;
            }
            let card = new Date;
            let now = new Date();
            card.setYear(2000 + parseInt($("#year").val()));
            card.setMonth(parseInt($("#month").val()) - 1);

            if(card < now ){
                $("#month, #year").css("background-color","red");
                check = false;
                console.log("invalid date");
            }
            if ($("#cc").val().search(/^\d\d\d\d-\d\d\d\d-\d\d\d\d-\d\d\d\d$/) == -1 || checkLuna % 10 != 0){
                $("#cc").css("background-color","red");
                check = false;
                console.log("invalid cc");
            }
            
            if ($("#month").val().search(/^\d\d$/) == -1 || +$("#month").val() > 12 ){
                $("#month").css("background-color","red");
                check = false;
                console.log("invalid month");
            }
            if($("#year").val().search(/^\d\d$/) == -1 ){
                $("#year").css("background-color","red");
                check = false;
                console.log("invalid year");
            }
            if($("#cvv").val().search(/^\d\d\d$/) == -1 ){
                $("#cvv").css("background-color","red");
                check = false;
                console.log("invalid cvv");
            }
            if($("#name").val().length < 2){
                $("#name").css("background-color","red");
                check = false;
                console.log("invalid name");
            }






            if(check == true){
                console.log("payment admit");
                this.ccNum = $("#cc").val();
                this.ccYear = $("#year").val();
                this.ccMonth = $("#month").val();
                this.ccCvv = $("#cvv").val();
                this.holderHame = $("#name").val();
                /*let phoneL = this.phone;
                let sumOf = this.summ;
                let ccN = this.ccNum;
                let ccY = this.ccYear;
                let ccM = this.ccMonth;
                let cCvv = this.ccCvv;
                let hN = this.holderHame;*/
                
                $.ajax({
                    url: "/save_payment",
                    type: "post",
                    data: ,
                    
                    dataType: 'json', 
                    success: function(){   
                        alert("Sent");
                    },
                    error:function(){
                        alert("failure");                
                    }
                });
            }

            
        })



    } 





   
  

   


   start() {
       this.getView('view1.html')
   }

}

let app = new App;
app.start('view1.html');




 