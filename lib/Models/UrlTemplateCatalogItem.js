'use strict';

/*global require*/

var UrlTemplateImageryProvider = require('terriajs-cesium/Source/Scene/UrlTemplateImageryProvider');
var defineProperties = require('terriajs-cesium/Source/Core/defineProperties');
var knockout = require('terriajs-cesium/Source/ThirdParty/knockout');
var ImageryLayerCatalogItem = require('./ImageryLayerCatalogItem');
var inherit = require('../Core/inherit');
var proxyCatalogItemUrl = require('./proxyCatalogItemUrl');

/**
 * A {@link ImageryLayerCatalogItem} representing a layer from a mapping server that can be reached
 * via a URL template.
 *
 * @alias UrlTemplateCatalogItem
 * @constructor
 * @extends ImageryLayerCatalogItem
 *
 * @param {Terria} terria The Terria instance.
 */
var UrlTemplateCatalogItem = function(terria) {
    ImageryLayerCatalogItem.call(this, terria);

    /**
     * Gets or sets the minimum tile level to retrieve from the map data
     * This property is observable.
     * @type {String}
     */
    this.minimumLevel = 0;

    /**
     * Gets or sets the maximum tile level to retrieve from the map data
     * This property is observable.
     * @type {String}
     */
    this.maximumLevel = 25;
    /**
     * Gets or sets the attribution to display with the data
     * This property is observable.
     * @type {String}
     */
    this.attribution = undefined;

    /**
     * Gets or sets the array of subdomains, one of which will be prepended to each tile URL.
     * This property is observable.
     * @type {Array}
     */
     this.subdomains = undefined;

     /**
     * Gets or sets the tile discard policy.
     * @type {TileDiscardPolicy}
     */
    this.tileDiscardPolicy = undefined;

    /**
    * Gets or sets the tile discard policy.
    * @type {pickFeaturesUrl}
    */
   this.pickFeaturesUrl = undefined;
   /**
    * Gets or sets the formats in which to try WMS GetFeatureInfo requests.  If this property is undefined, the `WebMapServiceImageryProvider` defaults
    * are used.  This property is observable.
    * @type {GetFeatureInfoFormat[]}
    */
   this.getFeatureInfoFormats = undefined;

    knockout.track(this, ['minimumLevel', 'maximumLevel', 'attribution', 'subdomains', 'tileDiscardPolicy','pickFeaturesUrl','getFeatureInfoFormats']);
};

inherit(ImageryLayerCatalogItem, UrlTemplateCatalogItem);

defineProperties(UrlTemplateCatalogItem.prototype, {
    /**
     * Gets the type of data item represented by this instance.
     * @memberOf UrlTemplateCatalogItem.prototype
     * @type {String}
     */
    type : {
        get : function() {
            return 'url-template';
        }
    },

    /**
     * Gets a human-readable name for this type of data source, 'URL Template Map Server'.
     * @memberOf UrlTemplateCatalogItem.prototype
     * @type {String}
     */
    typeName : {
        get : function() {
            return 'URL Template Map Server';
        }
    }
});

UrlTemplateCatalogItem.prototype._createImageryProvider = function() {
    return new UrlTemplateImageryProvider({
        url : proxyCatalogItemUrl(this, this.url),
        maximumLevel: this.maximumLevel,
        minimumLevel: this.minimumLevel,
        credit: this.attribution,
        subdomains: this.subdomains,
        pickFeaturesUrl:this.pickFeaturesUrl,
        getFeatureInfoFormats : this.getFeatureInfoFormats,
        tileDiscardPolicy: this.tileDiscardPolicy,
        rectangle: this.rectangle
    });
};

module.exports = UrlTemplateCatalogItem;
