$(document).ready(function () {
    var cur_p;
    $(".editor_body").on('keydown keyup keypress mousedown mouseup', (e) => {
        cur_p = saveSelection()
    })

    $(".editor_body").on('input', (e) => {
        if ($(".editor_body").html().length) {
            $(".blog_textEditorWrapper_inp_con").prev().css("display", 'none')
        }
    })

    var saveSelection = () => {
        if (window.getSelection) {
            var sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                return sel.getRangeAt(0);
            }
        } else if (document.selection && document.selection.createRange) {
            return document.selection.createRange();
        }
        return null;
    }

    var restoreSelection = (range) => {
        if (range) {
            if (window.getSelection) {
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.selection && range.select) {
                range.select();
            }
            return true
        }
    }

    var displayLN = () => {
        var el_h = $(".editor_body").outerHeight()
        var lines = Math.floor(el_h / 20)
        $(".lineNumber").html("")
        for (var i = 1; i < lines; i++) {
            $(".lineNumber").append("<div>" + i + "</div>")
        }

    }

    displayLN()
    $(".editor_body").on('keydown keyup keypress mousedown mouseup', (e) => {
        displayLN()
    })

    var editor_btns = document.querySelectorAll('.toolbar_btn');

    for (const ebtns of editor_btns) {
        ebtns.addEventListener('click', function (event) {
            var cmd = ($(this).attr('data-cmd'));
            if (cmd != null) {
                if (cmd != "veiwCode") {
                    if (cmd == 'H1' || cmd == 'H2' || cmd == 'H3') {
                        document.execCommand('formatBlock', false, cmd);
                    } else if (cmd == 'insertImage') {
                        var btn_stat = $(".toolbar_btn[data-cmd='insertImage']").attr('status')
                        if (btn_stat == "off") {
                            $(".insertImg_btn_dropdown").css("display", 'block')


                            // // text editor img upload
                            // $(".img_dropdown_menu").click(() => {
                            //     $(".blog_textEditor_img_inp").click;
                            // })


                            $(".imgUrl").click(() => {
                                $(".insertImg_btn_dropdown").css("display", 'none')
                                $(".editor_dataModal").css({
                                    "visibility": 'visible',
                                    "opacity": '1'
                                })
                                $(".imgUrl_dataModal_content").css("display", 'block')
                            })
                            $(".img_insertBtn").click(() => {
                                var val = $(".img_url_inp").val()
                                // console.log(restoreSelection(cur_p))
                                if (val) {
                                    if (restoreSelection(cur_p)) {
                                        document.execCommand(cmd, false, val);
                                        $(".img_url_inp").val("")
                                        $(".editor_dataModal").css({
                                            "visibility": 'hidden',
                                            "opacity": '0'
                                        })
                                        $(".imgUrl_dataModal_content").css("display", 'none')
                                    } else {
                                        $(".editor_body").append("<img src=" + val + ">")
                                        $(".img_url_inp").val("")
                                        $(".editor_dataModal").css({
                                            "visibility": 'hidden',
                                            "opacity": '0'
                                        })
                                        $(".imgUrl_dataModal_content").css("display", 'none')
                                    }

                                }
                            })
                            $(".toolbar_btn[data-cmd='insertImage']").attr('status', 'off')

                            console.log(btn_stat)
                        }
                        // else {
                        //     $(".insertImg_btn_dropdown").css("display", 'none')
                        //     $(".toolbar_btn[data-cmd='insertImage']").attr('status', 'off')
                        //     console.log(btn_stat)
                        // }

                        $(".img_cancleBtn").click(() => {
                            $(".editor_dataModal").css({
                                "visibility": 'hidden',
                                "opacity": '0'
                            })
                            $(".imgUrl_dataModal_content").css("display", 'none')
                            $(".toolbar_btn[data-cmd='insertImage']").attr('status', 'off')
                            console.log(btn_stat)
                        })
                    } else if (cmd == 'createLink') {
                        $(".editor_dataModal").css({
                            "visibility": 'visible',
                            "opacity": '1'
                        })

                        $(".createUrl_dataModal_content").css("display", 'block')
                        $(".createUrl_insertBtn").click(() => {
                            var val = $(".createUrl_inp").val()
                            if (val) {
                                if (restoreSelection(cur_p)) {
                                    document.execCommand(cmd, false, val);
                                    $(".createUrl_inp").val("")
                                    $(".editor_dataModal").css({
                                        "visibility": 'hidden',
                                        "opacity": '0'
                                    })
                                    $(".createUrl_dataModal_content").css("display", 'none')
                                } else {
                                    $(".editor_body").append("<a href=" + val + ">" + val + "</a>")
                                    $(".createUrl_inp").val("")
                                    $(".editor_dataModal").css({
                                        "visibility": 'hidden',
                                        "opacity": '0'
                                    })
                                    $(".createUrl_dataModal_content").css("display", 'none')
                                }

                            }
                        })

                        $(".createUrl_cancleBtn").click(() => {
                            $(".editor_dataModal").css({
                                "visibility": 'hidden',
                                "opacity": '0'
                            })
                            $(".createUrl_dataModal_content").css("display", 'none')
                        })
                    } else {
                        document.execCommand(cmd);
                    }
                } else {
                    displayLN()
                    var state = ($(this).attr('status'));

                    // console.log(state)
                    if (state == 'off') {
                        var content = $(".editor_body").html()
                        console.log(content);

                        $(".editor_body").text(content).css({
                            "background": '#0f1316',
                            "width": 'calc(100% - 35px)',
                            "color": '#00ffc3',
                            "box-shadow": 'inset 10px 10px 20px #090c0d, inset -10px -10px 20px #151a1f'
                        })
                        $(".lineNumber").css("display", 'block')
                        $(this).attr('status', 'on')

                    } else {
                        var content = $(".editor_body").text()
                        $(".editor_body").html(content).css({
                            "background": '#ffffff',
                            "width": '100%',
                            "color": '#000000',
                            "box-shadow": 'inset 9px 9px 35px #e9e9e9, inset -9px -9px 35px #e5e5e500'

                        })
                        $(".lineNumber").css("display", 'none')
                        $(this).attr('status', 'off')
                    }
                    displayLN()
                }
            }
        });
    };
});