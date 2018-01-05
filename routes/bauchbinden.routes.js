const router = require('express').Router();
const bauchbindenController = require('../controller/bauchbinden.controller');
const ApiError = require('../config/apiErrors');
const config = require('../config/config');
const httpStatus = require('http-status');


router.route('/')

    .get(bauchbindenController.getAll)
    .post(bauchbindenController.createNew)

    .all((req, res, next) => {
        let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    });


router.route('/:id')

    .get(bauchbindenController.getById)
    .put(bauchbindenController.updateById)
    .delete(bauchbindenController.deleteById)

    .all((req, res, next) => {
        let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    });



module.exports = router;