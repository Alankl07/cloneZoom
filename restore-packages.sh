for item in `dir`
do
    echo $item
    cd $item
    npm ci --silent
    cd ..
done