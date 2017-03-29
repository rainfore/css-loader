/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");
var path = require("path");

module.exports = function getLocalIdent(loaderContext, localIdentName, localName, options) {
	if(!options.context)
		options.context = loaderContext.options && typeof loaderContext.options.context === "string" ? loaderContext.options.context : loaderContext.context;
	var request = path.relative(options.context, loaderContext.resourcePath);
	options.content = options.hashPrefix + request + "+" + localName;
	// @TODO: This is a temp solution because a function cannot be transfered through a loader string.
	if(localName === 'root')
		localIdentName = localIdentName.replace(/_\[local\]/gi, '');
	else
		localIdentName = localIdentName.replace(/\[local\]/gi, localName);

	var filename = path.basename(loaderContext.resourcePath);
	if (!filename.startsWith('vi-'))
		localIdentName += '_[hash:base64:6]';
	var hash = loaderUtils.interpolateName(loaderContext, localIdentName, options);
	return hash.replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1");
};
