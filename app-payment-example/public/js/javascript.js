









class App {

    constructor() {

        this.numCard = '';
        this.phone = '';
        this.summ = '';
        this.templateName ='';
        this.open = '';
   }
    

   getView(templateName) {
    let self = this;
    $.ajax({
        url : '/get_templates/html/' + templateName,
        // /get_templates/html/view1.html
        success: function(d) {
           // console.log(this);
            
            if (templateName == "view1.html"){
                console.log(d);
                self.showPage1(d);
            }    
            if (templateName == "view2.html"){
                console.log(d);
                self.showPage2(d);
            }
        }
    });

}





    showPage1(d) {
                let getView = this.getView;
                $("#main").html(d);
                 
                
                


                $.ajax({
                    url : '/get_packets',
                    success: function(p){
                        console.log(p.packets[1])
                        for (let i = 0; i< p.packets.length; i++){
                            console.log("hello")
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
                     if($("#sum").val().search(/\d/) == -1){
                        $("#sum").css("background-color","red");
                        console.log("incorrect");
                        check = false;
                    }
                     if(check == true){
                    console.log("good enough");
                    this.phone = $("#tel").val();
                    this.summ = $("#sum").val();
                    
                    getView('view2.html');
                    
                    
                    }
               })
         

   }
   showPage2(d){
        let getView = this.getView;   
        console.log(d);
   }
  

   


   start() {
       this.getView('view1.html')
   }

}

let app = new App;
app.start();




 