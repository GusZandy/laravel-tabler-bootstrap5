<div class="form-group">
  @if (!empty($field['type']) && $field['type'] == 'checkbox')
  <div class="form-check">
    {{-- <input type="hidden" name="{{ $field['name'] }}" value="0"> --}}
    <input type="checkbox" class="form-check-input" id="{{ $field['name'] }}" name="{{ $field['name'] }}" value="1" {{ old($field['name'], isset($model) ? $model->{$field['name']} : null) == 1 ? 'checked' : '' }}>
    <label class="form-check-label" for="{{ $field['name'] }}">{{ !empty($field['label']) ? $field['label'] : \Illuminate\Support\Str::title(str_replace('_', ' ', \Illuminate\Support\Str::snake($field['name']))) }}{{ !empty($field['required']) ? '*' : '' }}</label>
    @if ($errors->has($field['name']))
    <div class="invalid-feedback">
      {{ $errors->first($field['name']) }}
    </div>
    @endif
  </div>
  @elseif (!empty($field['type']) && $field['type'] == 'radio')
  @foreach ($field['options'] as $key => $option)
  <div class="form-check">
    <input type="radio" class="form-check-input" id="{{ $field['name'] }}_{{ $key }}" name="{{ $field['name'] }}" value="{{ $option['value'] }}" {{ old($field['name'], isset($model) ? $model->{$field['name']} : null) == $option['value'] ? 'checked' : '' }}>
    <label class="form-check-label" for="{{ $field['name'] }}_{{ $key }}">{{ $option['text'] }}</label>
    @if ($errors->has($field['name']) && $loop->last)
    <div class="invalid-feedback">
      {{ $errors->first($field['name']) }}
    </div>
    @endif
  </div>
  @endforeach
  @else
  <label class="form-label">{{ !empty($field['label']) ? $field['label'] : \Illuminate\Support\Str::title(str_replace('_', ' ', \Illuminate\Support\Str::snake($field['name']))) }}{{ !empty($field['required']) ? '*' : '' }}</label>
  <input type="{{ !empty($field['type']) ? $field['type'] : 'text' }}"
         class="form-control {{ $errors->has($field['name']) ? 'is-invalid' : '' }}"
         name="{{ $field['name'] }}"
         value="{{ old($field['name'], isset($model) ? $model->{$field['name']} : null) }}"
         @if (!empty($field['type']) && $field['type'] == 'number')
         step="{{ !empty($field['step']) ? $field['step'] : 'any ' }}"
         @endif
         {{ !empty($field['required']) ? 'required' : '' }}>
  @if ($errors->has($field['name']))
  <div class="invalid-feedback">
    {{ $errors->first($field['name']) }}
  </div>
  @endif
  @endif
</div>
