if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

for folder in "$@"; do
    mkdir -p "$folder"
done