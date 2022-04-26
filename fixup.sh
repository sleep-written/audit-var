# Create directories
mkdir -p ./dist/mjs
mkdir -p ./dist/cjs

# Make files
cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >dist/mjs/package.json <<!EOF
{
    "type": "module"
}
!EOF