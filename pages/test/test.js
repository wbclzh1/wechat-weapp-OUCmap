Page({
  data: {
    objectArray: [


      { id: 1, name: "北门", latitude: "36.1669070000", longitude: "120.5033620000" },
      { id: 2, name: "东门", latitude: "36.1622090000", longitude: "120.5042700000" },
      { id: 3, name: "南门", latitude: "36.1581330000", longitude: "120.4930870000" },
      { id: 4, name: "西门", latitude: "36.1650400000", longitude: "120.4954700000" }

    ],
    numberArray: [
      ["北门", "36.1669070000", "120.5033620000"],
      ["东门", "36.1622090000", "120.5042700000"],
      ["南门", "36.1581330000", "120.4930870000"],
      ["西门", "36.1650400000", "120.4954700000"]
    ]
  },
  switch: function (e) {
    console.log(this.data.objectArray)
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function (e) {

    this.setData({
      objectArray: [

        { name: "第二教学楼", latitude: "36.1639430000", longitude: "120.4979150000" },
        { name: "第三教学楼", latitude: "36.1640250000", longitude: "120.4986180000" },
        { name: "第四教学楼", latitude: "36.1635960000", longitude: "120.4992620000" },
        { name: "第五教学楼", latitude: "36.1634490000", longitude: "120.4973660000" },
        { name: "第六教学楼", latitude: "36.1628170000", longitude: "120.4975590000" },
        { name: "第七教学楼", latitude: "36.1623140000", longitude: "120.4977760000" },
        { name: "第八教学楼", latitude: "36.1618070000", longitude: "120.4978540000" },

      ]
    })
    



  },
  addNumberToFront: function (e) {
    this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  }
})