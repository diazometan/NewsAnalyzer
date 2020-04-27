const presets = [
    [
        '@babel/preset-env',
        {
            useBuiltIns: 'entry',
            corejs: "3.4.1"
        },
    ],
];

module.exports = {presets};