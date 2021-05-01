module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            homepage: "https://github.com/vedaprakashms",
            builderOptions: {
                appId: "io.pedsextractionapp.desktop",
                productName: "PEDS Extraction App",
                linux: {
                    target: ["deb", "snap", "AppImage", "7z"],
                    category: "Utility",
                    icon: "./build/icons",
                },
                win: {
                    target: ["nsis", "portable", "7z"],
                    icon: "./build/icons",
                },
                portable: {
                    artifactName: "${productName}-${version}-portable.exe",
                },
            },
        },
    },
}
