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
   <img src = ${data.link} />
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


})