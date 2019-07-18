function getLinks(tag, done) {
    $.ajax({
        type: "GET",
        url: "/api/generator",

        data: {
            tag: tag,
            dataType: 'Json',

        },
        success: function (data) {
            // console.log((data));
            done(data)
        },

    })

}

function createList(data){
    console.log(data.link)
    return $(`
    <li class="list">${data.link}</li>
    `)
}


$(function () {
    let tag = $('#tag1')
    let dataList = $('#ul-list')

    $('#addbtn').click(function () {
        getLinks(
            tag.val(),
            function (datas) {
                for(data of datas) {
                    dataList.append(createList(data))
                }

            }
        )


    })

    // let tag2 = $('#tag2')

    // $('#uploadbtn').click(function () {

    // })

})