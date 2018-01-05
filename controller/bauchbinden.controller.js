const BauchbindenModel = require('../models/bauchbinden.model');
const ApiError = require('../config/apiErrors');
const httpStatus = require('http-status');


/* 
Export functions come in here ------------------------------------------------------------------------------
*/

function getAll(req, res, next) {
    BauchbindenModel.find({})
        .then(bauchbinden => res.json(bauchbinden))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getTotalNumber(req, res, next) {
    BauchbindenModel.count({})
        .then(count => res.json(count))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getById(req, res, next) {
    BauchbindenModel.findById(req.params.id)
        .then(bauchbinde => res.json(bauchbinde))
        .catch(err => next(new ApiError("No such ID found", httpStatus.NOT_FOUND)))
}

function deleteById(req, res, next) {

    BauchbindenModel.findOne({ _id: req.params.id }, function (err, item) {
        if (err) { return next(new ApiError("No such ID found", httpStatus.NOT_FOUND)) }
        else {
            BauchbindenModel.remove({ _id: req.params.id }, function (err, item) {
                if (err) {
                    return next(new ApiError("Error deleting", httpStatus.INTERNAL_SERVER_ERROR))
                }
                else {
                    res.json(`Item ${req.params.id} deleted`);
                }
            });
        }

    });
}

function createNew(req, res, next) {

    //make sure the image path matches config.storage + /imageName.png
    let newVideoBauchBinde = BauchbindenModel(req.body);
   
    newVideoBauchBinde.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).send("Bauchbinde for video " + newVideoBauchBinde.videoId+ " added in database!");
    });
}

function updateById(req, res, next) {

    BauchbindenModel.findOne({ _id: req.params.id }, function (err, item) {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempItem = item;

            //Assign body to Model
            //it's easier to assign everything new than to search in an array of objects...(means you need to send the whole entry)
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    tempItem[key] = req.body[key];
                }
            }

            BauchbindenModel.findByIdAndUpdate(req.params.id, tempItem, { new: true, runValidators: true }, function (err, item) {
                if (err) {
                    return next(err);
                }
                else {
                    res.json(`Item ${req.params.id} updated`);
                }
            });
        }
    })
}


module.exports = { getAll, getById, createNew, deleteById, updateById, getTotalNumber }
