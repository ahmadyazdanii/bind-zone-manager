const fs = require("fs")

class ZoneManager {
    constructor(ZoneFilePath=undefined) {
        this.ZoneFilePath = ZoneFilePath
        this.RawData = undefined
        this.rawDataList = undefined
        this.RemoveCommentsRegex = /(^(\/\*+[\s\S]*?\*\/)|(\/\*+.*\*\/)|^\/\/.*?[\r\n])[\r\n]*/gm
        this.RemoveBlankLineRegex = /\r\n|\n|\r/gm 

        this.GeneratePattern = 'zone "{Host}" {\n\ttype {Type};\n\tfile "{File}";\n};\n'
    }

    setRawData(rawData=undefined) {
        this.RawData = rawData ? rawData : fs.readFileSync(this.getZoneFilePath(), 'utf-8')
    }

    getRawData() {
        return this.RawData
    }

    setZoneFilePath(zoneFilePath) {
        this.ZoneFilePath = zoneFilePath
    }

    getZoneFilePath() {
        return this.ZoneFilePath
    }

    setRemoveCommentsRegex(regex) {
        this.RemoveCommentsRegex = regex
    }

    getRemoveCommentsRegex() {
        return this.RemoveCommentsRegex
    }

    setRemoveBlankLineRegex(regex) {
        this.RemoveBlankLineRegex = regex
    }

    getRemoveBlankLineRegex() {
        return this.RemoveBlankLineRegex
    }

    setRawDataList(list) {
        this.rawDataList = list
    }

    getRawDataList() {
        return this.rawDataList
    }

    getGeneratePattern() {
        return this.GeneratePattern
    }

    setGeneratePattern(string) {
        this.GeneratePattern = string
    }

    removeComments() {
        let changed = this.getRawData().replace(this.getRemoveCommentsRegex(), function (manual, pat) {
            return !pat ? manual : ""
        })
        this.setRawData(changed)
    }

    flatten() {
        this.setRawData(
            this.getRawData()
            .replace(/(?:(?:^ | $)|( ) )/gm, ' ') // remove duplicate white spaces
            .replace(this.getRemoveBlankLineRegex(), '') // remove blank line
            .replace(/\}(?:[\s]+|)\;/g, "};\n") // replace last line of zone 
            .replace(/\}|\{|\;|\t|\r|\"/g , ' ') // replace } { ; with white space         
            .replace(/^\s+|\s+$/g, '') // remove \n from end and first string
        )
    }
    
    splitRecords() {
        let recordList = this.getRawData().split('\n')
        if(recordList[recordList.length - 1] === '') recordList.pop()
        this.setRawDataList(recordList)
    }

    splitElementsOfRecords() {
        const regex = /\S+/g
        var rawDatalist = this.getRawDataList()
        var elementList = []
        for (let index = 0; index < rawDatalist.length; index++) {
            elementList.push(rawDatalist[index].match(regex))
        }
        this.setRawDataList(elementList)
    }

    Parse(rawData=undefined) {
        if(rawData) this.setRawData(rawData)
        else this.setRawData()

        this.removeComments()
        this.flatten()
        this.splitRecords()
        this.splitElementsOfRecords()

        var list = []
        this.getRawDataList().forEach(zone => {
            var object = {}
            for (let index = 0; index < zone.length; index += 2) {
                object[zone[index]] = zone[index + 1]
            }
            list.push(object)
        })
        return list
    }

    Generate(zoneList) {
        if(!zoneList || typeof zoneList !== 'object') throw new Error("invalid Generate function input")
        var zonesString = ""
        zoneList.forEach(zone => {
            var pattern = this.getGeneratePattern()
            pattern = pattern.replace("{Host}", zone.Host)
                             .replace("{Type}", zone.Type)
                             .replace("{File}", zone.DbFilePath)
            zonesString += pattern
        })
        return zonesString
    }
}

module.exports = ZoneManager
module.exports.ZoneManager = ZoneManager
module.exports.default = ZoneManager