import { FC } from "react";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const models = [
  {
    value: "black-forest-labs/flux-schnell",
    label: "black-forest-labs / flux-schnell",
  },
  {
    value: "black-forest-labs/flux-dev",
    label: "black-forest-labs / flux-dev",
  },
  {
    value: "black-forest-labs/flux-pro",
    label: "black-forest-labs / flux-pro",
  },
  {
    value: "black-forest-labs/flux-1.1-pro",
    label: "black-forest-labs / flux-1.1-pro",
  },
  {
    value: "black-forest-labs/flux-1.1-pro-ultra",
    label: "black-forest-labs / flux-1.1-pro-ultra",
  },
  {
    value: "stability-ai/stable-diffusion-3.5-large-turbo",
    label: "stability-ai / stable-diffusion-3.5-large-turbo",
  },
  {
    value: "stability-ai/stable-diffusion-3.5-large",
    label: "stability-ai / stable-diffusion-3.5-large",
  },
  {
    value: "stability-ai/stable-diffusion-3.5-medium",
    label: "stability-ai / stable-diffusion-3.5-medium",
  },
];



interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

const Combobox: FC<ComboboxProps> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {value
            ? models.find((model) => model.value === value)?.label
            : "Select model..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search model..." className="h-9" />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model.value}
                  value={model.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {model.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === model.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
