module.exports = {
    "file": "re.fasta",
    "vectors": {
        "chrome": {
            "noOverlap": {
                "windowWidth": 1000,
                "sites": [
                    {
                        "index": 0,
                        "cutType": "blunt",
                        "path": {
                            "translateCoords": {"x": 305.21875, "y": 0},
                            "noCompliment": " M 0 1 70.78125 1 70.78125 17.16 0 17.16 0 0 M 35.390625 1 35.390625 17.16 35.390625 17.16 35.390625 17.16",
                            "withCompliment": " M 0 1 70.78125 1 70.78125 33 0 33 0 0 M 35.390625 1 35.390625 17.16 35.390625 17.16 35.390625 33",
                        },
                        "text": {
                            "translateCoords": {
                                "noCompliment": {"x": 326, "y": 35},
                                "withCompliment": {"x": 326, "y": 50}
                            },
                            "value": "EcoRV"
                        },
                        "textBackground": {
                            "translateCoords": {
                                "noCompliment": {"x": 324, "y": 35},
                                "withCompliment": {"x": 324, "y": 50}
                            }
                        }
                    },
                    {
                        "index": 1,
                        "cutType": "sticky ends",
                        "path": {
                            "translateCoords": {"x": 69.28125, "y": 0},
                            "noCompliment": " M 0 1 70.78125 1 70.78125 17.16 0 17.16 0 0 M 58.984375 1 58.984375 17.16 11.796875 17.16 11.796875 17.16",
                            "withCompliment": " M 0 1 70.78125 1 70.78125 33 0 33 0 0 M 58.984375 1 58.984375 17.16 11.796875 17.16 11.796875 33"
                        },
                        "text": {
                            "translateCoords": {
                                "noCompliment": {"x": 95, "y": 35},
                                "withCompliment": {"x": 95, "y": 50}
                            },
                            "value": "SacI"
                        },
                        "textBackground": {
                            "translateCoords": {
                                "noCompliment": {"x": 88, "y": 35},
                                "withCompliment": {"x": 88, "y": 50}
                            }

                        }
                    }
                ]
            }
        },
        "firefox": {

        }
    }
};