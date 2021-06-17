 var orderValidator = new FormValidator();

        window.addEventListener('load', function() {

            var currentCountry = null;
            if (typeof jQuery.fn.mask === 'undefined') {
                var input = document.querySelector("input[name='phone']");
                var select = document.querySelector("select[name='offer']");
                var selectedCountry = select.options[select.selectedIndex].dataset.countryCode;

                currentCountry = {phoneCode: countriesData.getPhoneCode(selectedCountry)};
                input.placeholder = '+' + currentCountry.phoneCode;

                select.addEventListener('change', function() {
                    var previousPhoneCode = currentCountry.phoneCode;

                    selectedCountry = select.options[select.selectedIndex].dataset.countryCode;
                    currentCountry.phoneCode = countriesData.getPhoneCode(selectedCountry);

                    input.placeholder = '+' + currentCountry.phoneCode;
                    if (input.value) {
                        var newPhoneNumber = replacePhoneCode(input.value, previousPhoneCode, currentCountry.phoneCode);
                        if (newPhoneNumber) {
                            input.value = '+' + newPhoneNumber;
                        }
                    }
                });

                input.addEventListener('focus', function() {
                    if (!input.value) {
                        input.value = '+' + currentCountry.phoneCode;
                    }
                });

                input.addEventListener('blur', function() {
                    if (!input.value || input.value === '+') {
                        input.value = '+' + currentCountry.phoneCode;
                    }
                });
            }

            /*
             * Some typical form actions
             */
            set_validator_errors();
            orderValidator.addRule('name', orderValidator.errorNameField, 'length', {minlength: 2});
            orderValidator.addRule('phone', orderValidator.errorPhoneField, 'phone', {currentCountry: currentCountry});

            orderValidator.addMessages('name', {required: orderValidator.errorNameMess, minlength: orderValidator.errorNameMess});
            orderValidator.addMessages('phone', {phone: orderValidator.errorPhoneMess});

            orderValidator.addRule('other\[email\]', orderValidator.errorEmailField, 'email');
            orderValidator.addMessages('other\[email\]', {email: orderValidator.errorEmail});

            orderValidator.addRule('email', orderValidator.errorEmailField, 'email');
            orderValidator.addMessages('email', {email: orderValidator.errorEmail});

            orderValidator.watch('form:not(.novalidate, .notorder)');
        });

        $(document).on('keyup keydown click input', 'form:not(.novalidate, .notorder)', function (e) {
            var form = e.currentTarget;
            var copyFields = ['name', 'phone', 'offer'];
            for (var i = 0; i < copyFields.length; ++i) {
                var fieldName = copyFields[i];
                var value = $(this).find('[name=' + fieldName + ']').val();
                if (!value)
                    continue;
                var siblingInputs = $('form').not(form).find('[name=' + fieldName + ']');
                siblingInputs.val(value);
            }
        });

        function fixForm(form) {

            form = $(form);

            form.on('submit', function( e ){
                // Блокируем кнопки при отправке формы
                $('input[type=submit]', $(this)).prop( 'disabled', true ).attr( 'disabled', true );
                $('button', $(this)).prop( 'disabled', true ).attr( 'disabled', true );
                $('.test__question-total-btn .btn').prop( 'disabled', false ).attr( 'disabled', false );
                $('.btn-test').prop( 'disabled', false ).attr( 'disabled', false );
            });

            function _fieldExists(form, fieldName) {
                return Boolean(form.find('input[name=' + fieldName + '], select[name=' + fieldName + ']').length);
            }

            function _setField(form, fieldName, value) {
                value = value || '';
                if (!_fieldExists(form, fieldName)) {
                    var el = $('<input type="hidden" name="' + fieldName + '" value="">');
                    el.val(value);
                    form.prepend(el);
                }
            }

            if (form.data('seturl') || !$(this).attr('action')) {
                form.attr("action", 'order.php');
                form.prop("action", 'order.php');
                form.data('seturl', 1);
            }

            form.find('[name=name]').attr('autocomplete', 'name').attr("required", 'required');
            form.find('[name=phone]').attr('autocomplete', 'tel').attr("required", 'required');

            if (!_fieldExists(form, 'country')) {
                _setField(form, 'country', app.currentOffer.country.code);
            }
            
            _setField(form, 'utm_source', '');_setField(form, 'utm_medium', '');_setField(form, 'utm_campaign', '');_setField(form, 'utm_content', '');_setField(form, 'utm_term', '');_setField(form, 'sub1', '');_setField(form, 'sub2', '');_setField(form, 'sub3', '');_setField(form, 'sub4', '');_setField(form, 'sub5', '');_setField(form, 'fb_pixel', '');_setField(form, 'fb_verify', '');_setField(form, 'ya_pixel', '');_setField(form, 'tiktok_pixel', '');_setField(form, 'mail_pixel', '');_setField(form, 'google_pixel', '');_setField(form, 'google_adw_pixel', '');_setField(form, 'vk_pixel', '');_setField(form, 'yandex_metrika', '');_setField(form, 'topmail_pixel', '');_setField(form, 'formFields', '');
            if (!_fieldExists(form, 'timezone_int')) {
                var d = new Date(), tz = d.getTimezoneOffset() / -60;
                _setField(form, 'timezone_int', tz);
            }

        }

        function fixAllForms() {
            $('form').each(function(idx, form) {
                fixForm(form);
            });
        }

        window.app = {
            timestamp: parseInt((new Date()).getTime() / 1000),
            jq: jQuery,
            offers: {"22281":{"id":22281,"name":"CocoaSlim","country":{"code":"AR","name":"\u0410\u0440\u0433\u0435\u043d\u0442\u0438\u043d\u0430"},"price":"3900","price2":"7800","currency":{"code":"ARS","name":"$"}}},
            currentOffer: {"id":22281,"name":"CocoaSlim","country":{"code":"AR","name":"\u0410\u0440\u0433\u0435\u043d\u0442\u0438\u043d\u0430"},"price":"3900","price2":"7800","currency":{"code":"ARS","name":"$"}},
            allowedCountries: ["AR"],
            _setOfferId: false,

            setOffer: function (offerId) {
                if (offerId == this._setOfferId) {
                    return ;
                }
                this._setOfferId = offerId;
                if (offerId) {
                    var offer = app.offers[offerId];
                    var previousOffer = app.currentOffer;
                    app.currentOffer = offer;
                    var event = this.jq.Event("offerchange");
                    event.previousOffer = previousOffer;
                    event.currentOffer = app.currentOffer;
                    this.jq(document).trigger(event);
                    this.updatePage(offer);
                } else {
                    $('input[name=country]').val('');
                }
            },

            updatePage: function(offer) {
                $('x-newprice').html(offer.price);
                $('x-oldprice').html(offer.price2);
                $('x-currency').html(offer.currency.name);
                $('input[name=offer], select[name=offer]').val(offer.id);
                $('input[name=country]').val(offer.country.code);
            }


        };

        $(document).on('change input', 'select[name=offer]', function(e) {
            app.setOffer(this.value);
        });

        $(document).on('change input', function(e) {
            $('input[type=submit]', $(this)).prop( 'disabled', false ).attr( 'disabled', false );
            $('button', $(this)).prop( 'disabled', false ).attr( 'disabled', false );
        });

        setInterval(fixAllForms, 1000);