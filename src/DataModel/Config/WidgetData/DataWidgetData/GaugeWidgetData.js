import {
    View
} from "../../../../View/View.js";
import {
    WidgetConfig
} from "../../WidgetConfig.js";

/**
 * GaugeWidgetData is the datamodel of a gauge widget
 */
export class GaugeWidgetData {

    /**
     * Constructs new LineGraphWidgetData with an ID
     * @param {string} id
     *      id
     * @param {object} args
     *      arguments to init configurable data
     */
    constructor(id, args = {}) {
        this.id = id;
        this.type = WIDGET_TYPE_GAUGE;

        // WidgetView Callback to notify for changed Data
        this.dataCallbacks = [];
        // WidgetView Callback to notify for changed WidgetConfiguration
        this.configCallbacks = [];

        // Most recent data
        this.allData = [];

        // Init WidgetConfiguration
        this._initConfigurableData();
        // set widget Data Attributes
        this.setAttributes(args);
        // Get view and widgetConfig
        this.view = new View();
        this.widgetConfig = new WidgetConfig();
    }

    /**
     * Sets the attributes needed for configuraion
     * @param {object} args
     *      the attributes, has attributes "position" and "size"
     */
    setAttributes(args) {
        this.position = args.position;
        this.size = args.size;
    }

    /**
     * returns a list of booleans representing, which Data is needed.
     * @returns {object} the parameterMap
     */
    getParameterMap() {
        let pm = {
            DataStream_name: true,
            DataStream_description: false,
            DataStream_observationType: false,
            DataStream_unitOfMeasurement: false,
            DataStream_observedArea: false,
            DataStream_phenomenonTime: true,
            DataStream_resultTime: false,
            Observation_phenomenonTime: false,
            Observation_resultTime: false,
            Observation_result: true,
            Observation_resultQuality: false,
            Observation_validTime: false,
            Observation_parameters: false,
            FeatureOfInterest_name: false,
            FeatureOfInterest_description: false,
            FeatureOfInterest_encodingType: false,
            FeatureOfInterest_feature: false,
            ObservedProperty_name: false,
            ObservedProperty_definition: false,
            ObservedProperty_description: false,
            Sensor_name: false,
            Sensor_description: false,
            Sensor_encodingType: false,
            Sensor_metadata: false,
            Thing_name: false,
            Thing_description: false,
            Thing_properties: false,
            Thing_HistoricalLocations: false,
            Thing_Location_name: false,
            Thing_Location_description: false,
            Thing_Location_encodingType: false,
            Thing_Location_location: false,
        };
        return pm;
    }

    /**
     * This function inits every configurable data with their default
     * @private
     */
    _initConfigurableData()  {
        this.configurableData = {
            // View configuration
            title: {
                data: 'Gauge Widget',
                type: TYPE_STRING
            },
            min: {
                data: 0,
                type: TYPE_NUMBER
            },
            max: {
                data: 100,
                type: TYPE_NUMBER
            },
            shadow: {
                data: true,
                type: TYPE_BOOLEAN
            },
            textColor: {
                data: '#000000',
                type: TYPE_COLOR
            },
            tickmarksBigColor: {
                data: '#000055',
                type: TYPE_COLOR
            },
            tickmarksMediumColor: {
                data: '#000033',
                type: TYPE_COLOR
            },
            tickmarksSmallColor: {
                data: '#000000',
                type: TYPE_COLOR
            },
            backgroundColor: {
                data: '#FFFFFF',
                type: TYPE_COLOR
            },
            borderInnerColor: {
                data: '#FFFFFF',
                type: TYPE_COLOR
            },
            borderOuterColor: {
                data: '#EEEEEE',
                type: TYPE_COLOR
            },
            borderOutlineColor: {
                data: '#BBBBBB',
                type: TYPE_COLOR
            },
            needleColor: {
                data: '#FF0000',
                type: TYPE_COLOR
            },
            needleType: {
                data: 'line',
                type: TYPE_STRING
            },
            needleTail: {
                data: true,
                type: TYPE_BOOLEAN
            },
            centerpinRadius: {
                data: 7,
                type: TYPE_NUMBER
            },
            titleTop: {
                data: "",
                type: TYPE_STRING
            },
            titleTopSize: {
                data: 15,
                type: TYPE_INTEGER
            },
            titleTopColor: {
                data: '#000000',
                type: TYPE_COLOR
            },
            titleBottom: {
                data: "",
                type: TYPE_STRING
            },
            titleBottomColor: {
                data: '#000000',
                type: TYPE_COLOR
            },
            titleBottomSize: {
                data: 12,
                type: TYPE_INTEGER
            },
            labelsCentered: {
                data: true,
                type: TYPE_BOOLEAN
            },
            labelsOffset: {
                data: 7,
                type: TYPE_INTEGER
            },
            textAccessible: {
                data: true,
                type: TYPE_BOOLEAN
            },
            colorsRanges: {
                data: [{
                    data: {
                        lower: {
                            data: 60,
                            type: TYPE_NUMBER
                        },
                        upper: {
                            data: 80,
                            type: TYPE_NUMBER
                        },
                        color: {
                            data: '#FFFF00',
                            type: TYPE_COLOR
                        }
                    },
                    type: TYPE_OBJECT
                }, {
                    data: {
                        lower: {
                            data: 80,
                            type: TYPE_NUMBER
                        },
                        upper: {
                            data: 100,
                            type: TYPE_NUMBER
                        },
                        color: {
                            data: '#FF0000',
                            type: TYPE_COLOR
                        }
                    },
                    type: TYPE_OBJECT
                }],
                type: TYPE_ARRAY
            },
            // Data filter
            timeIntervalRelative: {
                data: true,
                type: TYPE_BOOLEAN
            },
            timeIntervalUnit: {
                data: UNIT_MONTH,
                type: TYPE_DROPDOWN,
                options: {
                    second: UNIT_SECOND,
                    minute: UNIT_MINUTE,
                    hour: UNIT_HOUR,
                    day: UNIT_DAY,
                    month: UNIT_MONTH,
                    year: UNIT_YEAR
                }
            },
            timeInterval: {
                data: 5,
                type: TYPE_INTEGER
            },
            startTime: {
                data: new Date(),
                type: TYPE_DATE
            },
            endTime: {
                data: new Date(),
                type: TYPE_DATE
            },

            // ST configuration Attention: mulitple Sensors are possible
            sensorThingsConfiguration: {
                data: [{
                    data: {
                        dataStreamUrl: {
                            data: '',
                            type: TYPE_FUZZY_SENSOR_SEARCH
                        },
                        mqttEnabled: {
                            data: false,
                            type: TYPE_BOOLEAN
                        },
                        mqttUrl: {
                            data: '',
                            type: TYPE_STRING
                        },
                        mqttBaseTopic: {
                            data: '',
                            type: TYPE_STRING
                        },
                        updateIntervalMs: {
                            data: 1000,
                            type: TYPE_INTEGER
                        }
                    },
                    type: TYPE_OBJECT
                }],
                type: TYPE_ARRAY
            }
        }
    }

    /**
     * DataObserver pushes new data, callback methods from view are executed with new data
     * @param {object} data
     *      new data
     */
    newData(data) {
        this.allData = data;
        for (let k in this.dataCallbacks) {
            this.dataCallbacks[k](this.allData);
        }
    }

    /**
     * Registers a callback function from the view
     * @param {function} dataFunc
     *      data callback function
     * @param {function} configFunc
     *      configuration callback function
     */
    registerViewCallback(dataFunc, configFunc) {
        this.dataCallbacks.push(dataFunc);
        this.configCallbacks.push(configFunc);
        dataFunc(this.allData);
        configFunc(this.configurableData);
    }

    /**
     * @returns {function} (this:LineGraphWidgetData)
     */
    getDataCallback() {
        return [this.newData.bind(this)];
    }

    /**
     * Deletes Widget
     * This function destroys every observing entity
     */
    destroy() {
        this.view.removeWidget(this.id);
        this.dataCallbacks = [];
    }

    /**
     * Getter for ID
     * @return {string} The ID
     */
    getID() {
        return this.id;
    }

    /**
     * Getter for Type
     * @return {number} The type
     */
    getType() {
        return this.type;
    }

    /**
     * Getter for position
     * @return {object} the position with attributes heigth and width
     */
    getPosition() {
        return this.position;
    }

    /**
     * Getter for size
     * @return {object} The size with attributes x and y
     */
    getSize() {
        return this.size;
    }

    /**
     * Get Query Params
     * @return QueryParams
     */
    getQueryParams() {
        return this.configurableData.sensorThingsConfiguration.data;
    }

    /**
     * Getter for queryIDs
     * @return {object} The QueryIDs
     */
    getQueryIDs() {
        return this.queryIDs;
    }

    /**
     * This function returns a key value map of the data, that is configurable
     */
    getConfigurableData() {
        return this.configurableData;
    }

    /**
     * This function sets the configurable data of this WidgetData
     * @param {object} configurableData Is a key value map of the data, that is configurable for this widget.
     */
    setConfigurableData(configurableData) {
        this.configurableData = configurableData;
        for (let k in this.configCallbacks) {
            this.configCallbacks[k](this.configurableData);
        }
        this.widgetConfig.widgetDataChanged(this.id);
    }

    /**
     * Setter for position
     * @param {object} position The new position, with attributes width and height
     */
    setPosition(position) {
        this.position = position;
    }

    /**
     * Setter for size
     * @param {object} size The new size, with x and y attributes
     */
    setSize(size) {
        this.size = size;
    }

    /**
     * Setter for queryID
     * @param {object} queryID the new queryID
     */
    setQueryIDs(queryIDs) {
        this.queryIDs = queryIDs;
    }
}