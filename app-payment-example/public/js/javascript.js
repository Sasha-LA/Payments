








class App {

    constructor() {

        this.numCard = '';
        this.phone = '';
        this.summ = '';
        this.templateName ='';
   }
    
    getView(templateName) {
       $.ajax({
           url : '/get_templates/html/' + templateName,
           // /get_templates/html/view1.html
           success: function(d) {
               
               
               if (templateName == "view1.html"){
                $("#main").html(d);
                 
                //show1(); 
                $("#tel").mask("+380(99) 999-99-99").keydown(function(){
                    $("#tel").css("background-color", "white");
                });


                $.ajax({
                    url : '/get_packets',
                    success: function(p){
                        console.log(p.packets[1])
                        for (let i = 0; i< p.packets.length; i++){
                            console.log("hello")
                            $('.hr').append("<li "+ "id='"+p.packets[i]+"'>"+p.packets[i] +"</li>"); 
                        }
                        $(".hr").click(function(ev){
                            let id = +ev.target.id;
                            let cur = $("#sum").val();
                            $("#sum").val(+cur+id);
                            
                            $("#sum").css("background-color", "white");
                          

                        })

                    }



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
                    
                    success("view2");
                    
                    
                    }
               })
            }   
                else
                    if (templateName == "view2"){
                        console.log("helloworld");
                        }  
           }
       });

   }
     
  

   


   start() {
       this.getView('view1.html')
   }

}

let app = new App;
app.start();




 