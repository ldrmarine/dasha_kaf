        var err_message = {
           
            at: "Geben Sie die richtige Telefonnummer ein",
            bg: "Въведете правилния телефонен номер",
            co: "Ingrese el número de teléfono correcto",
            cz: "Zadejte správné telefonní číslo",
            de: "Geben Sie die richtige Telefonnummer ein",
            dk: "Indtast det rigtige telefonnummer",
            ee: "Sisestage õige telefoninumber",
            es: "Ingrese el número de teléfono correcto",
            fi: "Syötä oikea puhelinnumero",
            gr: "Εισαγάγετε τον σωστό αριθμό τηλεφώνου",
            hu: "Írja be a helyes telefonszámot",
            id: "Masukkan nomor telepon yang benar",
            lt: "Įveskite teisingą telefono numerį",
            lv: "Ievadiet pareizo tālruņa numuru",
            mk: "Внесете го точниот телефонски број",
            nl: "Voer het juiste telefoonnummer in",
            ph: "Ipasok ang tamang numero ng telepono",
            th: "ป้อนหมายเลขโทรศัพท์ที่ถูกต้อง",
            pl: "Wprowadź poprawny numer telefonu",
            pt: "Digite o número de telefone correto",
            ro: "Introduceți numărul de telefon corect",
            sk: "Zadajte správne telefónne číslo",
            sl: "Vnesite pravilno telefonsko številko",
            vn: "Nhập số điện thoại chính xác",
            pe: "Ingrese el número de teléfono correcto",
            cl: "Ingrese el número de teléfono correcto",
            in: "सही फोन नंबर दर्ज करें",
            ba: "Unesite tačan telefonski broj",
            '34456': "درست فون نمبر درج کریں"


        }

        $( document ).ready(function() {

            var $phone_error = $( "<div id='phone_error' style='color:red; font-weigth:bold;'></div>" );

            $( $phone_error ).insertAfter($('input[name="phone"]'));
            $('#phone_error').text(err_message[$('input[name="country"]').val()]);
            $('#phone_error').hide();

        });


		var sended = false;        

		$("form").submit(function (e) {

		    if (!sended) {                
		                                                         
		        if ( $('input[name="phone"]').val().length < 6 ) {
		                        
		            $('#phone_error').show();                          
		            e.preventDefault();

		         } else {
		                    
		            sended = true;
		            return;

		         }
		                 
		    } else return false;

		}); 