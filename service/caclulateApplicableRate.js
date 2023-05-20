const LoadService = require("./loadService");
const RateService = require("./rateService");

async function caclulateApplicableRate(loadId){
    const load = await LoadService.getLoadById(loadId);
    let andRuleResult = false
    let andAmountResult  = 0
    let rulesAndOr
    const rates = await RateService.getAllRates();
    let applicableAmount

    const filterRes = rates.map((rate) => {
        let rulesArray = []
        if (rate.rules.AND.length){
            rulesArray = rate.rules.AND
            rulesAndOr = 'and'
        } else if(rate.rules.OR.length) {
             rulesArray =  rate.rules.OR
            rulesAndOr = 'or'
        }

        const resultOfAnd = rulesArray.map(data => {
            if (data["type_of_load"] && data["type_of_load"].length && data["type_of_load"].includes(load.type_of_load)){
                return true
            }
            if (data.caller && data.caller === load.caller.toString()){
                return true
            }
            if (data.containerSize && data.containerSize === load.containerSize.toString()){
                return true
            }
            if (data.overWeight === false && load.overWeight === false){
                return true
            }
            if (data.overWeight === true && load.overWeight === true) {
                return true
            }
        })
        if(resultOfAnd.length) {
            const allTrue = resultOfAnd.every(x => x === true);
            const allFalse = resultOfAnd.every(x => x === undefined);
            console.log('allFalse ==', allFalse)
            if (allTrue && rulesAndOr === 'and') {
                andRuleResult = true
                const getRange= rate.amountWithRange.find((item) => item.start < load.distance && item.end >= load.distance)
                if (getRange.type === 'fixed'){
                    applicableAmount = getRange.amount
                }
                if (getRange.type === 'perunit'){
                    applicableAmount = getRange.amount * load.distance
                }
            }
            if (!allFalse && !applicableAmount && rulesAndOr === 'or'){
                const getRange= rate.amountWithRange.find((item) => item.start < load.distance && item.end >= load.distance)
                if (getRange.type === 'fixed'){
                    applicableAmount = getRange.amount
                }
                if (getRange.type === 'perunit'){
                    applicableAmount = getRange.amount * load.distance
                }
            }
        }
    })
    return applicableAmount ? applicableAmount : 'not satisfied with any rule'
}

module.exports = caclulateApplicableRate